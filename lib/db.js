import Database from 'better-sqlite3';

const dbPool = [];
const MAX_CONNECTIONS = 10;

export function getDbConnection() {
    if (dbPool.length < MAX_CONNECTIONS) {
        const db = new Database('purified.db');
        dbPool.push(db);
        return db;
    } else {
        return dbPool[Math.floor(Math.random() * dbPool.length)];
    }
}

export function setupDB(db) {
    try {
        db.exec(`
            CREATE TABLE IF NOT EXISTS "messages" (
                "ID" INTEGER NOT NULL UNIQUE,
                "username" TEXT NOT NULL,
                "message" TEXT NOT NULL,
                "timestamp" INTEGER NOT NULL,
                PRIMARY KEY("ID" AUTOINCREMENT)
            );
        `);
        db.exec(`
            CREATE TABLE IF NOT EXISTS "users" (
                "email" TEXT NOT NULL UNIQUE,
                "displayName" TEXT NOT NULL UNIQUE,
                "username" TEXT NOT NULL UNIQUE,
                "password" TEXT NOT NULL,
                "creation_date" INTEGER NOT NULL,
                "verified" INTEGER NOT NULL,
                PRIMARY KEY("username")
            );
        `);
        console.log("Setup DB.");
        return true;
    } catch (e) {
        console.error("Error setting up DB:", e.message);
        return false;
    }
}

export function checkTableExists(db, tableName) {
    const query = `
        SELECT name
        FROM sqlite_master
        WHERE type='table' AND name=?;
    `;
    const row = db.prepare(query).get(tableName);
    return !!row;
}

export function findUser(db, username, email) {
    if (!username && !email) {
        throw new Error("Either username or email must be provided.");
    }

    const query = `
        SELECT *
        FROM users
        WHERE username = ?
           OR email = ?;
    `;
    const row = db.prepare(query).get(username || null, email || null);
    return row || null;
}

export function addUser(db, displayName, username, email, hash, creationDate = new Date().getTime(), verified = false) {
    const query = `
        INSERT INTO users (displayName, username, email, password, creationDate, verified)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    try {
        const stmt = db.prepare(query);
        stmt.run(displayName, username, email, hash, creationDate, verified);
        console.log('User added successfully');
        return true;
    } catch (err) {
        console.error('Error adding user:', err.message);
        return false;
    }
}