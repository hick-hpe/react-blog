import { Router, Request, Response } from "express";
import db from "./database";
import { authMiddleware } from "./authService";

const routerPost: Router = Router();

routerPost.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });

        console.log('ROTA /posts GET');
        console.log(JSON.stringify(rows));
        console.log();
        res.json(rows);
    });
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
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) res.status(500).json({ error: err.message });
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

    const sql = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)";
    db.run(sql, [req.session.user?.id, title, content], function (err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content });
    });
});

routerPost.put("/:id", authMiddleware, (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Verifica se ao menos um campo foi enviado
    if (!title && !content) {
        res.status(400).json({ error: "Envie ao menos um campo para atualizar!" });
    }

    const fields: string[] = [];
    const values: any[] = [];

    if (title) {
        fields.push("title = ?");
        values.push(title);
    }

    if (content) {
        fields.push("content = ?");
        values.push(content);
    }

    values.push(id); // o ID vai por último, sempre

    const sql = `UPDATE posts SET ${fields.join(", ")} WHERE id = ?`;

    db.run(sql, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ id, title, content });
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
