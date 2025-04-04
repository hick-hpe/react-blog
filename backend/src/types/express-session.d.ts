// src/types/express-session.d.ts ou src/@types/express-session.d.ts

import { SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        user_id?: number; // Adiciona a propriedade USER_ID como um número
    }
}
