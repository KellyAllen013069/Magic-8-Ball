
import query from "../db/utils.js";

const findAll = async () => {
  return await query("SELECT * FROM Users")
}

const findGoogleUser = async (authID) => {
  return await query("SELECT * FROM Users WHERE AuthType='google' AND AuthID = ?",[authID])
}

const findGitHubUser = async (authID) => {
  return await query("SELECT * FROM Users WHERE AuthType='github' AND AuthID = ?",[authID])
}

const findUserById = async (id) => {
  return await query("SELECT * FROM Users WHERE id = ?", [id])
} 

const findUserByEmail = async (email) => {
  return await query("SELECT * FROM Users where EmailAddress = ?", [email])
}

const findLocalUserByEmail = async (email) => {
  return await query("SELECT * FROM Users where AuthType='local' AND EmailAddress = ?", [email])
}


const findUserByName = async (name) => {
  return await query("SELECT * FROM Users where Name = ?",[name])
}

const addUser = async (user) => {
  return await query('INSERT INTO Users SET ?',[user])
}

const updateUser = async (user, userID) => {
  return await query("UPDATE Users SET ? WHERE UserID = ?", [user, userID])
}

const removeUser = async (userID) => {
  return await query("DELETE FROM Users WHERE UserID = ?", userID)
}



export default {
  findAll,
  findGoogleUser,
  findGitHubUser,
  findUserById,
  findUserByEmail,
  findLocalUserByEmail,
  findUserByName,
  addUser,
  updateUser,
  removeUser,
};