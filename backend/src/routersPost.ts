import { Router, Request, Response } from "express";
import db from "./database";
import { authMiddleware } from "./authService";

const routerPost: Router = Router();

type Post = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    createdBy?: string;
}

type User = {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

routerPost.get("/", async (req: Request, res: Response) => {
    try {
        db.all("SELECT * FROM posts", [], async (err, rows: Post[]) => {
            if (err) return res.status(500).json({ error: err.message });

            const rowsWithUsers = await Promise.all(rows.map((row) => {
                return new Promise((resolve, reject) => {
                    db.get("SELECT nome FROM usuario WHERE id = ?", [row.user_id], (err, userRow: User) => {
                        if (err) return reject(err);
                        row.createdBy = userRow?.nome;
                        resolve(row);
                    });
                });
            }));

            res.json(rowsWithUsers);
        });
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).json({ error: "Erro ao buscar posts." });
    }
});


routerPost.get("/my", authMiddleware, (req: Request, res: Response) => {
    const user_id = req.session?.user?.id;
    if (!user_id) res.status(401).json({ error: "Não autenticado" });

    db.all("SELECT * FROM posts WHERE user_id = ?", [user_id], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

routerPost.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    db.get("SELECT * FROM posts WHERE id = ?", [id], async (err, row: Post) => {
        if (err) res.status(500).json({ error: err.message });

        row = await new Promise((resolve, reject) => {
            db.get("SELECT nome FROM usuario WHERE id = ?", [row.user_id], (err, userRow: User) => {
                if (err) return reject(err);
                row.createdBy = userRow?.nome;
                resolve(row);
            });
        });

        console.log('Unico');
        console.log(JSON.stringify(row));
        console.log();
        res.json(row);
    });
});

routerPost.get("/my/:id", authMiddleware, (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.session?.user?.id;
    if (!user_id) res.status(401).json({ error: "Não autenticado" });

    db.get("SELECT * FROM posts WHERE id = ? AND user_id = ?", [id, user_id], (err, row) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(row);
    });
});

routerPost.post("/", authMiddleware, (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const sql = "INSERT INTO posts (user_id, title, content, createdAt) VALUES (?, ?, ?, ?)";
    const dataNow = new Date().toISOString();
    db.run(sql, [req.session.user?.id, title, content, dataNow], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content });
    });

});

routerPost.put("/:id", authMiddleware, (req: Request, res: Response): Response | any => {
    console.log("ROTA /posts/:id PUT");

    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
        return res.status(400).json({ error: "Envie ao menos um campo para atualizar!" });
    }

    console.log(`Atualizando post: ${id}
Título: ${title}
Conteúdo: ${content} 
Atualizado em: ${new Date()}   
    `);

    const sql = `UPDATE posts SET title = ?, content = ?, updatedAt = ? WHERE id = ?`;
    const dataNow = new Date().toISOString();
    console.log('Update date: ', dataNow);
    db.run(sql, [title, content, dataNow, id], function (err) {
        console.log('---------- rodando script ----------');
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log('tudo ok!!!');
        return res.json({ id, title, content });
    });
});


routerPost.delete("/:id", authMiddleware, (req: Request, res: Response) => {
    const { id } = req.params;
    db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ success: true, deletedId: id });
    });
});

export default routerPost;
