import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/index.js";
import config from "./config/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {join}  from 'path';
import passport from 'passport';
import flash from 'connect-flash'
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import connection from "./db/connection.js";
import dotenv from 'dotenv'


const app = express();


/**
 * Parses incoming request body as json if header indicates application/json
 */

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(cors(
  {
    credentials: true,
  }
));


/**
 * ----------------------------SESSIION SETUP-----------------------------
 */

 const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  schema: {
    tableName: 'sessions'
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { 
    maxAge: 86400000,
    path: '/'
  } 
}));

//use flash for passport error handling
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());


/**
 * Logs incoming request information to the dev console
 */
app.use(morgan("dev"));

/**
 * Directs incoming static asset requests to the public folder
 */
app.use(express.static(join(__dirname, "../client/build")));

/**
 * Directs all routes starting with /api to the top level api express router
 */
app.use("/api", apiRouter);


/**
 * Sends the react app index.html for page requests
 * Only needed in production when you are not using the react dev server
 */
app.use((req, res, next) => {
  try {
    res.sendFile(join(__dirname, "../client/build/index.html"));
  } catch (error) {
    next(error);
  }
});


/* app.use((req, res, next) => {
  console.log("REQUEST IS *********" + JSON.stringify(req));
  console.log("******RESPONSE IS ****" + JSON.stringify(res));
  //next();
}); */
/**
 * Error handler middleware
 */

 //app.use(errorHandler);
/**
 * Bind the app to a specified port
 * You can access your app at http://localhost:<port>
 */
app.listen(config.port || 5000, () =>
  console.log(`Server listening on port ${config.port}...`)
);