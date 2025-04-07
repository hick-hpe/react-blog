// criar rotas
import { Router, Request, Response } from "express";
import db from "./database";
import { authMiddleware } from "./authService";

const router: Router = Router();

// ========================== Rota protegida ==========================
router.get('/protected', authMiddleware, (req:Request, res:Response) => {
    res.json({ message: `${req.session.user?.nome}, você tem acesso a essa rota protegida!` });
});

// rota /isLogged
router.get('/isLogged', (req:Request, res:Response) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
})


router.post("/login", (req:Request, res:Response) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    console.log("Login recebido:", email, senha);

    db.get(
        "SELECT * FROM usuario WHERE email = ? AND senha = ?",
        [email, senha],
        (err, user: { id: number; nome: string; email: string; senha: string } | undefined) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                return res.status(500).json({ error: "Erro interno do servidor" });
            }

            if (!user) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            req.session.user = user;
            console.log("Login realizado:", req.session.user);
            return res.json({ message: "Login bem-sucedido" });
        }
    );
});


// Cadastro de usuário
router.post("/register", async (req: Request, res: Response): Promise<any> => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    db.get(
        "SELECT * FROM usuario WHERE email = ?",
        [email],
        (err, user: { id: number; nome: string; email: string; senha: string } | undefined) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                res.status(500).json({ error: "Erro interno do servidor!" });
            }

            if (user) {
                res.status(409).json({ error: "Usuário já existe!" });
            }

            const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
            db.run(sql, [nome, email, senha], function (err) {
                if (err) {
                    console.error("Erro ao inserir o usuário:", err);
                    res.status(500).json({ error: "Erro interno do servidor!" });
                }

                req.session.user = { id: this.lastID, nome, email, senha };
                res.status(201).json({ message: "Usuário registrado com sucesso!", id: this.lastID });
            });
        }
    );
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ error: "Erro ao encerrar a sessão" });
            }
            res.status(200).json({ message: "Logout realizado com sucesso!" });
        });
    } else {
        res.status(400).json({ error: "Nenhuma sessão ativa" });
    }
});


export default router;
