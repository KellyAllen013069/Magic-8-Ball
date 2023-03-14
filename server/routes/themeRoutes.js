import express from "express";
import themes from "../controllers/themes.controller.js";

const themeRouter = express.Router();

themeRouter.get("/:id", async (req, res, next) => {
    try{
        let {id} = req.params;
        let data = await themes.findByID(id);
        res.json(data[0]);
    }
    catch(err) {
        next(err);
    }
})

themeRouter.get("/public", async (req, res, next) => {
    try {
        let data = await themes.findAllPublic();
        console.log(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

themeRouter.get("/admin", async (req,res,next) => {
    console.log("IN ADMIN******");
    try {
        let data = await themes.findAllToPublish();
        res.json(data)
    } catch(err) {
        next(err);
    }
});

themeRouter.post("/userThemes", async (req, res, next) => {
    try {
        let {id} = req.body;
        console.log("id is " + id);
        let data = await themes.findAllForUserID(parseInt(id))
        console.log(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
});


themeRouter.post('/', async (req, res, next) => {
    try {
        let theme = req.body;
        console.log("reqbody is " + theme);
        let data = await themes.addTheme(theme);
        res.json ({
            status: 'success',
            theme: data
        });
    } catch (err) {
        next (err);
    }
});

themeRouter.put('/', async (req, res, next) => {
    try {
        let theme = req.body;
        console.log("reqbody is " + theme);
        let data = await themes.updateTheme(theme);
        res.json ({
            status: 'success',
            theme: data
        });
    } catch (err) {
        next (err);
    }
});

themeRouter.put("/admin", async (req, res, next) => {
    try {
        let id = req.body.id;
        let theme = {
            Type: req.body.type,
            AdminComments: req.body.comments
        }
        console.log("id is " + id);
        console.log("theme is " + theme);
        let data = await themes.updateTheme(theme, parseInt(id));
        res.json(data);
    } catch (err) {
        next(err)
    }

});

themeRouter.delete("/:id", async (req, res, next) => {
    try {
        let {id} = req.params;
        let data = await themes.removeTheme(parseInt(id));
        res.json(data);

    } catch (err) {
        next(err);
    }
})

export default themeRouter;