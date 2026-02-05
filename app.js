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

/**
 * 
 * @returns
 */
async function getAllEtudiant() {
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

async function addEtudiant(
    etudiant_num_carte_identite,
    etudiant_nom,
    etudiant_prenom,
    etudiant_email = null,
    etudiant_annees_experience = null,
    etudiant_telephone = null,
    etudiant_adresse_ligne_1 = null,
    etudiant_adresse_ligne_2 = null,
    etudiant_code_postal = null,
    etudiant_ville = null,
    etudiant_niveau_etudes = null
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
            1
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

// COURS

console.log(await addEtudiant('CI-0009', 'Daniel', 'Antoine'))