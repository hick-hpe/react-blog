import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // req.session.user
    const logado = true;
    if (logado) {
        // Se o usuário estiver autenticado (presente na sessão), segue para a próxima rota
        console.log('ok, logado!');
        next();
    } else {
        // Caso contrário, retorna erro ou redireciona
        console.log("Não autorizado");
        res.status(401).send("Não autorizado");
    }
}

export default authMiddleware;
