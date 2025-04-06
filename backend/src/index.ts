import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routesAuth";
import routerUser from "./routersUser";
import routerPost from "./routersPost";

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
        maxAge: 2 * 60 * 1000,
        httpOnly: false,
        secure: false
    }
}));

app.use('/auth', router);
app.use('/api/user', routerUser);
app.use('/api/posts', routerPost);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
