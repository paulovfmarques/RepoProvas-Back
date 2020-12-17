require("dotenv").config();
const express = require("express");
const cors = require("cors");

const searchController = require("./controllers/searchController");
const uploadController = require("./controllers/uploadController");

const app = express();

app.use(cors());
app.use(express.json());

// Defining Routes

app.use("/api/upload", uploadController);
app.use("/api/fetch", searchController);

const port = process.env.PORT;


app.listen(port, () => console.log(`Servidor running on port ${port}`));

module.exports = app;