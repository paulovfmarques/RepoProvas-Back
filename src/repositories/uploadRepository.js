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

async function uploadData(dataParams) {
    const { title, subject, category, professor, url } = dataParams;

    const respCategory = await db.query('SELECT id FROM category WHERE category=$1', [category]);
    const categoryId = respCategory.rows[0].id;
    
    const respSubject = await db.query('SELECT id FROM subjects WHERE name=$1', [subject]);
    const subjectId = respSubject.rows[0].id;

    const respProfClass = await db.query('SELECT professor_id FROM prof_class WHERE subject_id=$1', [subjectId]);
    const professorId = respProfClass.rows[0].professor_id;

    const uploadArr = [
        title.trim(),
        categoryId,
        url.trim(),
        subjectId,
        professorId
    ];    

    await db.query(`INSERT INTO exams 
    (semester, category_id, url, subject_id, professor_id)
    VALUES ($1, $2, $3, $4, $5)`, uploadArr);


}

module.exports = { uploadData, fetchStoredParams };