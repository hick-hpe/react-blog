// criar rotas
import { Router, Request, Response } from "express";
import db from "./database";
import authMiddleware from "./auth";

import { validateUser, createUser } from "./authService";
const router:Router = Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.send("Você tem acesso a essa rota protegida!");
});

// ============================================ auth ============================================
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log('email: ' + email);
    console.log('senha: ' + password);

    if (!email || !password) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    try {
        const user = await validateUser(email, password);

        if (!user) {
            res.status(401).json({ error: "Credenciais inválidas!" });
        }

        req.session.user_id = user?.id;

        res.json({ message: "Login bem-sucedido!" });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: "Erro interno do servidor!" });
    }
});


router.post("/register", async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    // Verifica se o email e senha foram fornecidos
    if (!email || !senha) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    try {
        const existingUser = await validateUser(email, senha);

        if (existingUser) {
            res.status(409).json({ error: "O email já está registrado!" });
        }

        const newUser = await createUser(email, senha);

        req.session.user_id = newUser.id;

        res.json({ message: "Cadastro bem-sucedido!" });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ error: "Erro interno do servidor!" });
    }
});




// ============================================ users ============================================
router.get("/users", (req: Request, res: Response) => {
    db.all("SELECT * FROM usuario", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


router.post("/users", async (req: Request, res: Response):Promise<void> => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        res.status(400).json({ error: "Preencha todos os campos!" });
        return;
    }

    const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    db.run(sql, [nome, email, senha], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, nome, email, senha });
    });
});

// ============================================ posts ============================================
router.get("/posts", (req: Request, res: Response) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.get("/my-posts", (req: Request, res: Response) => {
    const user_id = req.session.user_id;
    
    db.all("SELECT * FROM posts WHERE user_id = ?", [user_id], (err, rows) => {
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


router.post("/posts", (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const sql = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)";
    db.run(sql, [1, title, content], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, title, content });
    });
});

export default router;
