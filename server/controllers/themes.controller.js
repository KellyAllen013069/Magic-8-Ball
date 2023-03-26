import query from "../db/utils.js";

const findByID = async (id) => {
    return await query('SELECT * FROM Themes WHERE ThemeID = ?', [id])
}

const findAllForUserID = async (UserID) => {
    return await query("SELECT * FROM Themes WHERE UserID = ?", [UserID])
}

/* const findAllPublic = async () => {
    return await query("SELECT * FROM Themes WHERE Type='public'")
} */

const findAllPublicAndUser = async (id) => {
    return await query(`SELECT Themes.*, Users.Name as UserName FROM Themes LEFT JOIN Users ON Themes.UserId = Users.id WHERE Themes.type='public' OR Themes.UserID=${id}`)
}

/* const findAllPublic = async () => {
    return await query(`SELECT Themes.*, Users.Name as UserName FROM Themes LEFT JOIN Users ON Themes.UserId = Users.id WHERE Themes.type='public'`)
} */

const findAllPublic = async () => {
    return await query(`SELECT * FROM Themes WHERE Type='public'`)
}

const findAllToPublish = async () => {
    return await query("SELECT * FROM Themes WHERE Type='publish'")
}

const addTheme = async (theme) => {
    return await query("INSERT INTO Themes SET ?", [theme])
  }

const updateTheme = async (theme, themeID) => {
    return await query("UPDATE Themes SET ? WHERE ThemeID = ?", [theme, themeID]);
}

const removeTheme = async (themeID) => {
    return await query("DELETE FROM Themes where ThemeID = ?", [themeID]);
}

export default {
 findByID,
 findAllForUserID,
 findAllPublic,
 findAllPublicAndUser,
 findAllToPublish,
 addTheme,
 updateTheme,
 removeTheme
};