import query from "../db/utils";

const findDefaultResponses = async () => {
  console.log ('in finddefault');
  return await query("SELECT * FROM Responses WHERE Responses.UserID = 3");
};

//find by user

const findUserResponses = async (UserID) => {
  return await query("SELECT * FROM Responses WHERE Responses.UserID = ?", [UserID]);
};

/* const find = async(columnMatch) => {
  return await query("SELECT * FROM Responses WHERE ?", [columnMatch])
}; */

export default {
  findDefaultResponses,
  findUserResponses,
};
