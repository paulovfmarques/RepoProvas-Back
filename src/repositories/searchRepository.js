const db = require("../database/index");

async function fetchStoredParams() {
    const respSubjects = await db.query('SELECT * FROM subjects');
    const subjects = respSubjects.rows;

    const respCategory = await db.query('SELECT * FROM category');
    const category = respCategory.rows;

    const respProfessors = await db.query('SELECT * FROM professors');
    const professors = respProfessors.rows;

    const respProfClass = await db.query('SELECT * FROM prof_class');
    const profClass = respProfClass.rows;

    return {subjects, category, professors, profClass}
}

module.exports = { fetchStoredParams };