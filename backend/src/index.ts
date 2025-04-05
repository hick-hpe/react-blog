import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes";
import authMiddlware from "./auth";

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173", // ou onde está seu frontend
    credentials: true // Permite cookies de sessão
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'xbsjddnjfkmasçlfsfagsgs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000,
        httpOnly: false,
        secure: false
    }
}));

app.use('/api', router);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
