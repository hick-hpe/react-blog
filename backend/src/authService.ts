import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.user) {
        console.log('req.session.user:', req.session.user);
        next();
    } else {
        console.log("Não autorizado");
        res.status(401).send("Não autorizado");
    }
}


