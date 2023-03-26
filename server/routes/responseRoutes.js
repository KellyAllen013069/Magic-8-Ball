import express from "express";
import responses from "../controllers/responses.controller.js";


const responseRouter = express.Router();

responseRouter.get("/default", async (req, res, next) => {
        try {
                //let {name}= req.params;
                console.log("in finding default");
                let data = await responses.findDefaultResponses();
                res.json(data);

        } catch (err) {
                next(err)
        }
});

responseRouter.post("/responsesForTheme", async (req, res, next) => {
        try {
                let {themeId} = req.body;
                console.log("getting by theme id AND themeid is " + themeId)
                let data = await responses.findResponsesByThemeID(themeId);
                res.json(data); 
        }
        catch (err){
                next(err)
        }
});



responseRouter.post("/", async (req, res, next) => {
        try {
                let {response} = req.body;
                let data = await responses.addResponse(response);
                res.json(data)

        } catch (err) {
                next(err)
        }
});

responseRouter.post("/addAllResponses", async (req, res, next) => {
        console.log("getting to the route")
        try {
                let {themeID, phrases} = req.body
                console.log(" themeID is " + themeID);
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&phrases are " + phrases);
                let data = await responses.addMultipleResponses(themeID, phrases)
                res.json(data)

        } catch (err) {
                next(err)
        }
});

responseRouter.put("/updateAllResponses", async (req, res, next) => {
        console.log("******PUT RESPONSE ROUTE")
        console.log("PUT BODY IS  " + JSON.stringify(req.body.responses))
        try {
                let phrasesToUpdate = req.body.responses;
                
                console.log("PHRASES ARE " + JSON.stringify(phrasesToUpdate));
                let data = await responses.updateMultipleResponses(phrasesToUpdate)
                res.json(data)

        } catch (err) {
                next(err)
        }
});

responseRouter.put("/id", async (req, res, next) => {
        try {
                let {id} = req.params;
                let data = await responses.updateResponse(id);
                res.json(data)

        } catch (err) {
                next(err)
        }
});

responseRouter.delete("/id", async (req, res, next) => {
        try {
                let {id} = req.params;
                let data = await responses.removeResponse(id);
                res.json(data)

        } catch (err) {
                next(err)
        }
});


export default responseRouter;
