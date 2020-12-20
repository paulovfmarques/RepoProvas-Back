const db = require("../database/index");

//SEARCH BY PROFESSORS
async function fetchProfessors() {
    
    const resp = await db.query(`
        SELECT professors.name AS professor,
        professors.id AS professor_id,
        COUNT(prof_class.subject_id) FROM professors
        INNER JOIN prof_class ON professors.id=prof_class.professor_id
        GROUP BY professors.name, professors.id
        ORDER BY professors.name ASC;
    `);
    const professors = resp.rows;

    return professors;
}

async function fetchCategories(professorId) {
    
    const resp = await db.query(`
        SELECT category.category AS category,
        category.id AS category_id, professors.id AS professor_id,
        COUNT(exams.id) FROM category
        INNER JOIN exams ON category.id=exams.category_id
        INNER JOIN professors ON professors.id=exams.professor_id
        WHERE professors.id=$1
        GROUP BY category.category, category.id,professors.id
        ORDER BY category.category ASC;
    `,[professorId]);
    const categories = resp.rows;

    return categories;
}

async function fetchProfessorExams(professorId, categoryId) {
    
    const resp = await db.query(`
        SELECT exams.semester AS exam, exams.url,
        subjects.name AS subject_name FROM exams
        INNER JOIN professors ON professors.id=exams.professor_id
        INNER JOIN subjects ON subjects.id=exams.subject_id
        INNER JOIN category ON category.id=exams.category_id
        WHERE professors.id=$1 AND category.id=$2
        GROUP BY exams.semester,subjects.name, exams.url
        ORDER BY exams.semester ASC;
    `,[professorId, categoryId]);
    const exams = resp.rows;

    return exams;
}

module.exports = {
    fetchProfessors,
    fetchCategories,
    fetchProfessorExams
};