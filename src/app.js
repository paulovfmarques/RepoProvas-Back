require("dotenv").config();
const express = require("express");
const cors = require("cors");

const searchSubjectController = require("./controllers/searchSubjectController");
const searchProfessorController = require("./controllers/searchProfessorController");
const uploadController = require("./controllers/uploadController");

const app = express();

app.use(cors());
app.use(express.json());

// Defining Routes

app.use("api/fetch-by-professor", searchProfessorController);
app.use("/api/upload", uploadController);
app.use("/api/fetch-by-subject", searchSubjectController);


const port = process.env.PORT;


app.listen(port, () => console.log(`Servidor running on port ${port}`));

module.exports = app;