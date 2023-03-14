import mysql from "mysql";
import config from "../config/index.js";

const connection = mysql.createPool(config.mysql);

export default connection;
