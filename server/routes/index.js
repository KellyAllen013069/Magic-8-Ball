import express from "express";

import responseRouter from "./responseRoutes.js";
import themeRouter from "./themeRoutes.js";
import authGoogleRouter from "./authGoogleRoutes.js";
import authLocalRouter from "./authLocalRoutes.js";
import userRouter from "./userRoutes.js";
import authGitHubRouter from "./authGitHubRoutes.js";


const router = express.Router();

router.use("/responses", responseRouter);
router.use("/themes", themeRouter);
router.use("/authgoogle", authGoogleRouter);
router.use("/authgithub", authGitHubRouter);
router.use("/authlocal", authLocalRouter);
router.use("/user", userRouter);
router.use("/users", userRouter)


export default router;
