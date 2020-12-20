const express = require("express");
const professorRepository = require("../repositories/professorRepository");

const router = express.Router();

router.get("/professors", async (req,res) => {
    try{
        const info = await professorRepository.fetchProfessors();
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err);
    }
});

router.get("/categories", async (req,res) => {
    const professorId = req.query.professor_id;

    try{
        const info = await professorRepository.fetchCategories(professorId);
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err);
    }
});

router.get("/exams", async (req,res) => {
    const professorId = req.query.professor_id;
    const categoryId = req.query.category_id;

    try{
        const info = await professorRepository.fetchProfessorExams(professorId, categoryId);
        res.status(200).send(info);
    }catch(err){
        res.sendStatus(err);
    }
});



module.exports = router;