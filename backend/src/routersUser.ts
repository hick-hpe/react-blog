import { Router, Request, Response } from "express";
import db from "./database";
// import { authMiddleware } from "./authService";

const routerUser: Router = Router();

routerUser.get("/users", (req: Request, res: Response) => {
    db.all("SELECT * FROM usuario", [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

routerUser.post("/users", (req: Request, res: Response) => {
    console.log('-------------------- ROTA /users POST --------------------');
    const { nome, email, senha } = req.body;
    console.log('nome: ' + nome);
    console.log('email: ' + email);
    console.log('senha: ' + senha);

    if (!nome || !email || !senha) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    db.run(sql, [nome, email, senha], function (err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nome, email, senha });
    });
});

routerUser.put("/users/:id", (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    const { id } = req.params;

    if (!nome || !email || !senha) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
    db.run(sql, [nome, email, senha, id], function (err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ id, nome, email, senha });
    });
});

routerUser.delete("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    db.run("DELETE FROM usuario WHERE id = ?", [id], function (err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ success: true, deletedId: id });
    });
});

export default routerUser;
