// criar rotas
import { Router, Request, Response } from "express";
import db from "./database";

const router:Router = Router();

router.get("/users", (req: Request, res: Response) => {
    db.all("SELECT * FROM usuario", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.get("/posts", (req: Request, res: Response) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.get("/posts/:id", (req: Request, res: Response) => {
    const POST_ID = req.params.id;
    db.all("SELECT * FROM posts WHERE id = ?", [POST_ID], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// router.post("/users", (req: Request, res: Response) => {
//     const { nome, email, senha } = req.body;
//     if (!nome || !email || !senha) {
//         return res.status(400).json({ error: "Preencha todos os campos!" });
//     }

//     const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
//     db.run(sql, [nome, email, senha], function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ id: this.lastID, nome, email, senha });
//     });
// });

// router.post("/posts", (req: Request, res: Response) => {
//     const { title, content } = req.body;
//     if (!title || !content) {
//         return res.status(400).json({ error: "Preencha todos os campos!" });
//     }

//     const sql = "INSERT INTO posts (title, content) VALUES (?, ?)";
//     db.run(sql, [title, content], function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ id: this.lastID, title, content });
//     });
// });

export default router;
