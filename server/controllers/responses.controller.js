import query from "../db/utils.js";



const findDefaultResponses = async () => {
  return await query("SELECT ResponseID, Phrase from Responses JOIN Themes ON Responses.ThemeID = Themes.ThemeID JOIN Users ON Themes.UserID = Users.id WHERE Users.Name= 'default'");
};

//find by user
//should have themeid
const findResponsesByThemeID = async (themeID) => {
  return await query("SELECT * FROM Responses WHERE ThemeID= ?", [themeID]);
};

/* const find = async(columnMatch) => {
  return await query("SELECT * FROM Responses WHERE ?", [columnMatch])
}; */

const addResponse = async (response) => {
  return await query("INSERT INTO Responses SET ?", [response])
}

const addMultipleResponses = async (themeID, phraseArray) => { 
  let values = phraseArray.map(value => [themeID, value]);
  return await query(`INSERT INTO Responses (ThemeID, Phrase) VALUES ?`, [values]);
}

const updateMultipleResponses = async (phraseArray) => {
  let values = phraseArray.map(value => [value.ResponseID, `${value.Phrase}`]);
  const queryStatement = `
  UPDATE Responses 
  SET Phrase = 
    CASE 
      ${values.map(value => `WHEN ResponseID = ${value[0]} THEN '${value[1]}'`).join(' ')}
      ELSE Phrase
    END
  WHERE ResponseID IN (${values.map(value => value[0]).join(',')});
`;

  return await query(queryStatement);
}

const updateResponse = async (response, responseID) => {
  return await query("UPDATE Responses SET ? WHERE ResponseID = ?", [response, responseID])
}

const removeResponse = async (ResponseID) => {
  return await query("DELETE FROM Responses  WHERE ResponseID = ?", [ResponseID])
}

export default {
  findDefaultResponses,
  findResponsesByThemeID,
  addResponse,
  addMultipleResponses,
  updateMultipleResponses,
  updateResponse,
  removeResponse
};
