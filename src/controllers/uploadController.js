const express = require("express");
const uploadRepository = require("../repositories/uploadRepository");
const { validateUpload } = require("../middlewares/validation");

const router = express.Router();

router.get("/database-info", async (req, res) => {    
    try{
        const info = await uploadRepository.fetchStoredParams();
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }    
});

router.post("/exam-info", validateUpload, async (req, res) => {
    const dataParams = req.body;

    try{
        await uploadRepository.uploadData(dataParams);
        res.sendStatus(201);
    }catch(err){
        res.sendStatus(err);
    }    
});

module.exports = router;