import "express-session";

declare module "express-session" {
  interface SessionData {
    user:{id: number, nome: string, email: string, senha: string};
  }
}
