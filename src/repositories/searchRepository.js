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

async function fetchSubjects() {
    const respSubjCount = await db.query(`
        SELECT terms.name AS term_name, COUNT(subjects.name)
        FROM terms INNER JOIN subjects
        ON subjects.term_id=terms.id
        GROUP BY terms.id
        ORDER BY terms.name ASC`);
    const subjectsPerTerm = respSubjCount.rows;

    const respExamCount = await db.query(`
        SELECT subjects.name AS subject_name, COUNT(exams.subject_id)
        FROM subjects INNER JOIN exams
        ON subjects.id=exams.subject_id
        GROUP BY subjects.name
        ORDER BY subjects.name ASC`);
    const examsPerSubject = respExamCount.rows;

    const respExamCategCount = await db.query(`
        SELECT category.category AS category_name,
        subjects.name AS subject_name, COUNT(exams.subject_id)
        FROM category INNER JOIN exams
        ON category.id=exams.category_id
        INNER JOIN subjects ON subjects.id=exams.subject_id
        GROUP BY category.category, subjects.name
        ORDER BY category.category ASC`);
    const examsPerCategory = respExamCategCount.rows;

    return {subjectsPerTerm, examsPerSubject, examsPerCategory}
}

module.exports = { fetchStoredParams, fetchSubjects };