import query from "../db/utils.js";



const findDefaultResponses = async () => {
  return await query("SELECT ResponseID, Phrase from Responses JOIN Themes ON Responses.ThemeID = Themes.ThemeID JOIN Users ON Themes.UserID = Users.id WHERE Users.Name= 'default'");
};

//find by user
//should have themeid
const findResponsesByThemeID = async (themeID) => {
  console.log("IN HERE AND themeid is " + themeID);
  return await query("SELECT * FROM Responses WHERE ThemeID= ?", [themeID]);
};

/* const find = async(columnMatch) => {
  return await query("SELECT * FROM Responses WHERE ?", [columnMatch])
}; */

const addResponse = async (response) => {
  return await query("INSERT INTO Responses SET ?", [response])
}

const addMultipleResponses = async (themeID, phraseArray) => {
  console.log("PHRASE ARRAY IS *******" + phraseArray);
  console.log("THEME ID IS " + themeID);
  let values = phraseArray.map(value => [themeID, value]);
  return await query(`INSERT INTO Responses (ThemeID, Phrase) VALUES ?`, [values]);
}

const updateMultipleResponses = async (phraseArray) => {
  console.log("in UPDATE PHRASE ARRAY IS *******" + phraseArray);
  let values = phraseArray.map(value => [value.ResponseID, `${value.Phrase}`]);
  //let values = phraseArray.map(value => [value.ResponseID, ${value.Phrase}]);
  console.log("in UPDATE PHRASE ARRAY IS *******" + phraseArray.map(value => JSON.stringify(value)).join(", "));
  //let queryStatement = `UPDATE Responses SET Phrase = CASE ResponseID ${values.map(value => `WHEN ${value[0]} THEN '${value[1]}'`).join(' ')} END;`;
  const queryStatement = `
  UPDATE Responses 
  SET Phrase = 
    CASE ResponseID 
      ${values.map(value => `WHEN ${value[0]} THEN '${value[1]}'`).join(' ')} 
    END;
`;

  console.log("QUERY STATEMENT IS " + queryStatement);
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
