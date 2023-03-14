
import query from "../db/utils.js";

const findAll = async () => {
  return await query("SELECT * FROM Users")
}

const findGoogleUser = async (authID) => {
  console.log('IN FIND GOOGLE USER');
  return await query("SELECT * FROM Users WHERE AuthType='google' AND AuthID = ?",[authID])
}

const findGitHubUser = async (authID) => {
  console.log('IN FIND GITHUB USER');
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
  console.log("finding one by name & name is " + name);
  return await query("SELECT * FROM Users where Name = ?",[name])
}

const addUser = async (user) => {
  console.log("IN ADD USER FROM GITHUB user is " + JSON.stringify(user))
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