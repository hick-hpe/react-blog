import * as sqlite3 from "sqlite3";

const DBSOURCE = "./database.db";
const SCRIPTS_SQLITE3 = [`
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
    )`,
    `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES usuario(id) ON DELETE CASCADE
    );
    `,
    `INSERT INTO posts (user_id, title, content) VALUES (1, 'Meu primeiro post', 'Conteúdo do primeiro post...')`,
]
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        SCRIPTS_SQLITE3.forEach((SCRIPT_SQLITE3) => db.run(SCRIPT_SQLITE3));
        console.log('Script SQLite3 executado com sucesso.');
    }
});

export default db;
