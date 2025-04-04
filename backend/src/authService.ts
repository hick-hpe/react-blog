// authService.ts

import db from "./database";

interface Usuario {
    id: number;
    email: string;
    senha: string;
}

export const validateUser = async (email: string, senha: string): Promise<Usuario | null> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id, email, senha FROM usuario WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
            if (err) {
                console.log('Erro ao consultar o banco de dados', err);
                reject(err);
            }
            if (row && row.id && row.email && row.senha) {
                // Se row contiver as propriedades id, email e senha
                console.log('ROW:', JSON.stringify(row));
                resolve({
                    id: row.id,
                    email: row.email,
                    senha: row.senha
                });
            } else {
                // Caso row não seja válido
                resolve(null);
            }
        });
    });
};

export const createUser = async (email: string, senha: string): Promise<Usuario> => {
    return new Promise((resolve, reject) => {
        // Inserir um novo usuário no banco de dados (garanta que a senha seja criptografada antes de armazená-la)
        db.run('INSERT INTO usuario (email, senha) VALUES (?, ?)', [email, senha], function (err) {
            if (err) {
                console.log('Erro ao inserir usuário no banco de dados', err);
                reject(err);
            } else {
                resolve({ id: this.lastID, email, senha });
            }
        });
    });
};

