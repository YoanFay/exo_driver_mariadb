import mariadb from "mariadb";
import { loadEnvFile } from 'node:process'

loadEnvFile('./.env');

const connectionPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.CONNECTION_LIMIT_AMOUNT
});

let connection;

// ETUDIANT

async function getAllEtudiants() {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query("SELECT * FROM etudiant");
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

async function getOneEtudiant(etudiant_id) {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query(`SELECT * FROM etudiant WHERE etudiant_id = ${etudiant_id}`);
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

async function addEtudiant(
    etudiant_num_carte_identite,
    etudiant_nom,
    etudiant_prenom,
    tuteur_Id
) {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query(
            `INSERT INTO etudiant(
            etudiant_num_carte_identite, 
            etudiant_nom,
            etudiant_prenom,
            tuteur_id
        )
            VALUES (
            '${etudiant_num_carte_identite}',
            '${etudiant_nom}',
            '${etudiant_prenom}',
            '${tuteur_Id}'
            )`
        );
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

/*
async function updateEtudiant(
    etudiant_num_carte_identite,
    etudiant_nom,
    etudiant_prenom
) {
    //WIP
}
*/

async function getEtudiantByCours(cours_thematique) {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query(`SELECT * FROM etudiant WHERE etudiant_Id IN (SELECT etudiant_Id FROM assister WHERE cours_Id = (SELECT cours_id FROM cours WHERE cours_thematique = "${cours_thematique}"))`);
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

// COURS

async function getAllCours() {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query("SELECT * FROM cours");
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

async function getOneCours(cours_id) {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query(`SELECT * FROM cours WHERE cours_id = ${cours_id}`);
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

async function addCours(
    discipline_Id,
    intervenant_siret,
    salle_Id
) {
    try {
        connection = await connectionPool.getConnection();
        const rows = await connection.query(
            `INSERT INTO cours(
            discipline_Id, 
            intervenant_siret,
            salle_Id
        )
            VALUES (
            '${discipline_Id}',
            '${intervenant_siret}',
            '${salle_Id}'
            )`
        );
        connectionPool.end();
        return rows;
    }
    catch (error) {
        console.log(error);
        connectionPool.end();
    }
}

console.log(await getEtudiantByCours('DevOps - Docker'))