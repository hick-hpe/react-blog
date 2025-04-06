// criar rotas
import { Router, Request, Response } from "express";
import db from "./database";
import { authMiddleware } from "./authService";

const router: Router = Router();

// ========================== Rota protegida ==========================
router.get('/protected', authMiddleware, (req:Request, res:Response) => {
    res.json({ message: `${req.session.user?.nome}, você tem acesso a essa rota protegida!` });
});

router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.get(
        "SELECT * FROM usuario WHERE email = ? AND senha = ?",
        [email, senha],
        (err, user: { id: number; nome: string; email: string; senha: string } | undefined) => {
            if (err || !user) {
                res.status(401).json({ error: "Credenciais inválidas" });
            }

            if (!req.session) {
                res.status(500).json({ error: "Sessão não disponível" });
            }

            req.session.user = user;
            console.log("Login realizado:", req.session.user);
            res.json({ message: "Login bem-sucedido" });
        }
    );
});

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    db.get(
        "SELECT * FROM usuario WHERE nome = ? AND email = ? AND senha = ?",
        [nome, email, senha],
        (err, user: { id: number; nome: string; email: string; senha: string } | undefined) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                return res.status(500).json({ error: "Erro interno do servidor!" });
            }

            if (user) {
                return res.status(409).json({ error: "Usuário já existe!" });
            }

            const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
            db.run(sql, [nome, email, senha], function (err) {
                if (err) {
                    console.error("Erro ao inserir o usuário:", err);
                    return res.status(500).json({ error: "Erro interno do servidor!" });
                }

                req.session.user = { id: this.lastID, nome, email, senha };
                return res.json({ id: this.lastID, nome, email, senha });
            });
        }
    );
});

export default router;
