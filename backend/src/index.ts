import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes";
import authMiddlware from "./auth";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);
// app.use("/auth", router);

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

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
