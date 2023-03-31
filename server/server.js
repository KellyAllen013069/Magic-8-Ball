import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/index.js";
import config from "./config/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import path from 'path';
import passport from 'passport';
import flash from 'connect-flash'
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import dotenv from 'dotenv'


const app = express();
dotenv.config();


/**
 * Parses incoming request body as json if header indicates application/json
 */

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));

/**
 * Logs incoming request information to the dev console
 */
 app.use(morgan("dev"));


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

/**
 * --------------------------------------------------------------------------
 */

//use flash for passport error handling
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

/**
 * Directs all routes starting with /api to the top level api express router
 */
app.use("/api", apiRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

/**
 * Error handler middleware
 */

 app.use(errorHandler);
/**
 * Bind the app to a specified port
 */
if (process.env.PORT) {
  app.listen(config.port || 8080, () =>
    console.log(`Server listening on port ${config.port}...`)
  );
} else {
  console.log("No port configured")
}

export default app;