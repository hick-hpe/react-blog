import { Router, Request, Response } from "express";
import db from "./database";
import { authMiddleware } from "./authService";

const routerUser: Router = Router();

type User = {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

routerUser.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM usuario", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(rows);
    });
});

routerUser.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<Response|any> => {
    const { nome, email, senhaAtual, senhaNova } = req.body;

    if (!nome || !email || !senhaAtual) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios!" });
    }

    if (!req.session.user?.id) {
        return res.status(401).json({ error: "Usuário não autenticado!" });
    }

    db.get(
        "SELECT * FROM usuario WHERE id = ? AND senha = ?",
        [req.session.user?.id, senhaAtual],
        (err, user: { id: number; nome: string; email: string; senha: string } | undefined) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                return res.status(500).json({ error: "Erro interno do servidor!" });
            }

            if (!user) {
                return res.status(401).json({ error: "Senha atual incorreta!" });
            }

            let sql = '';
            let listValues: any[] = [];

            if (senhaNova) {
                sql = 'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?';
                listValues = [nome, email, senhaNova, req.session.user?.id];
            } else {
                sql = 'UPDATE usuario SET nome = ?, email = ? WHERE id = ?';
                listValues = [nome, email, req.session.user?.id];
            }

            db.run(sql, listValues, function (err) {
                if (err) {
                    console.error("Erro ao atualizar o usuário:", err);
                    return res.status(500).json({ error: "Erro interno do servidor!" });
                }

                req.session.user = {
                    id: req.session.user?.id,
                    nome,
                    email,
                    senha: senhaNova || req.session.user?.senha || '',
                } as User;

                return res.json({ message: "Dados atualizados com sucesso!" });
            });
        }
    );
});

routerUser.delete("/:id", authMiddleware, (req: Request, res: Response) => {
    const { id } = req.params;
    db.run("DELETE FROM usuario WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        req.session.destroy((err) => {
            if (err) {
                console.error("Erro ao destruir a sessão:", err);
                return res.status(500).json({ error: "Erro interno do servidor!" });
            }
            console.log("Sessão destruída com sucesso!");
            return res.clearCookie("connect.sid", { path: "/" });
        })

        console.log("Usuário excluído com sucesso!");
        return res.json({ success: true, deletedId: id });
    });
});

export default routerUser;
