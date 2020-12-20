const express = require("express");
const searchRepository = require("../repositories/subjectRepository");

const router = express.Router();

router.get("/terms", async (req, res) => {    
    try{
        const info = await searchRepository.fetchTerms();
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }    
});

router.get("/subjects", async (req, res) => {
    const termId = req.query    
    try{
        const info = await searchRepository.fetchSubjetcsPerTerm(termId);
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }    
});

router.get("/categories", async(req, res) => {
    const subjectId = req.query;
    try{
        const info = await searchRepository.fetchExamsPerCategory(subjectId);
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }
});

router.get("/exams", async(req, res) => {
    const categoryId = req.query.category_id;
    const subjectId = req.query.subject_id;    
    try{
        const info = await searchRepository.fetchExams(categoryId,subjectId);
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err)
    }
});

module.exports = router;