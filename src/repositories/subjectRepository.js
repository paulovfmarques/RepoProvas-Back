const db = require("../database/index");


//SEARCH BY SUBJECTS
async function fetchTerms() {
    
    const resp = await db.query(`
        SELECT terms.name AS term_name,
        terms.id AS term_id, COUNT(subjects.name)
        FROM terms INNER JOIN subjects
        ON subjects.term_id=terms.id
        GROUP BY terms.id
        ORDER BY terms.name ASC
        `);
    const terms = resp.rows;    

    return terms;
}

async function fetchSubjetcsPerTerm(id) {    
    
    const resp = await db.query(`
        SELECT subjects.id AS subject_id,
        subjects.name AS subject_name,
        COUNT(exams.subject_id) FROM subjects
        LEFT JOIN exams ON subjects.id=exams.subject_id
        LEFT JOIN terms ON subjects.term_id=terms.id
        WHERE terms.id=$1
        GROUP BY subjects.name, subjects.id
        ORDER BY subjects.id ASC
    `,[id.term_id]);
    const subjectsPerTerm = resp.rows;

    return subjectsPerTerm;
}

async function fetchExamsPerCategory(id) {
    
    const resp = await db.query(`
        SELECT category.category AS category,
        category.id AS category_id, subjects.id AS subject_id,
        COUNT(exams.subject_id) FROM category
        INNER JOIN exams ON category.id=exams.category_id
        INNER JOIN subjects ON subjects.id=exams.subject_id
        WHERE subjects.id=$1
        GROUP BY category.category, category.id, subjects.id
        ORDER BY category.category ASC
    `,[id.subject_id]);
    const examsPerCategory = resp.rows;

    return examsPerCategory;
}

async function fetchExams(categoryId, subjectId) {
    
    const resp = await db.query(`
        SELECT exams.semester AS exam, exams.url, professors.name AS professor FROM exams
        INNER JOIN professors ON professors.id=exams.professor_id
        INNER JOIN subjects ON subjects.id=exams.subject_id
        INNER JOIN category ON category.id=exams.category_id
        WHERE category.id=$1 AND subjects.id=$2
        GROUP BY exams.semester,professors.name, exams.url
        ORDER BY exams.semester ASC
    `,[categoryId, subjectId]);
    const exams = resp.rows;
      
    return exams;
}


module.exports = { 
    fetchTerms,
    fetchSubjetcsPerTerm, 
    fetchExamsPerCategory, 
    fetchExams    
 };