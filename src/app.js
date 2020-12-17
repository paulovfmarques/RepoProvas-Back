require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

// Defining Routes

//app.use("/api/upload");
//app.use("/api/fetch");

const port = process.env.PORT;


app.listen(port, () => console.log(`Servidor running on port ${port}`));

module.exports = app;