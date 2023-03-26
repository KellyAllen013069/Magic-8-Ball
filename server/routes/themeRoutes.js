import express from "express";
import themes from "../controllers/themes.controller.js";

const themeRouter = express.Router();

themeRouter.get("/byid/:id", async (req, res, next) => {
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

themeRouter.post("/publicAndUser", async (req, res, next) => {
    try {
        let {id} = req.body;
        let data = await themes.findAllPublicAndUser(id);
        console.log(data);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

themeRouter.get("/admin", async (req,res,next) => {
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
        let data = await themes.findAllForUserID(parseInt(id))
        res.json(data);
    } catch (err) {
        next(err);
    }
});


themeRouter.post('/addTheme', async (req, res, next) => {
    try {
        let theme = req.body;
        let data = await themes.addTheme(theme);
        res.json ({
            status: 'success',
            theme: data
        });
    } catch (err) {
        next (err);
    }
});

themeRouter.put('/updateTheme/:themeID', async (req, res, next) => {
    try {
        let {themeID} = req.params;
        let data = await themes.updateTheme(req.body, themeID);
        res.json ({
            status: 'success',
            theme: data
        });
    } catch (err) {
        next (err);
    }
});

themeRouter.put("/adminUpdate", async (req, res, next) => {
    try {
        let id = req.body.id;
        let theme = {
            Type: req.body.type,
            AdminComments: req.body.comments,
            AdminApproval: req.body.approved
        }
        let data = await themes.updateTheme(theme, parseInt(id));
        res.json(data);
    } catch (err) {
        next(err)
    }

});

themeRouter.delete("/deleteTheme/:id", async (req, res, next) => {
    try {
        let {id} = req.params;
        let data = await themes.removeTheme(parseInt(id));
        res.json(data);

    } catch (err) {
        next(err);
    }
})

export default themeRouter;