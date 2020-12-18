const express = require("express");
const searchRepository = require("../repositories/searchRepository")

const router = express.Router();

router.get("/database-info", async (req, res) => {    
    try{
        const info = await searchRepository.fetchStoredParams();
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }    
});

router.get("/subjects", async (req, res) => {    
    try{
        const info = await searchRepository.fetchSubjects();
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }    
});

module.exports = router;