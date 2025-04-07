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
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'xbsjddnjfkmasçlfsfagsgs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000,
        httpOnly: false,
        secure: false
    }
}));

app.use('/auth', router);
app.use('/api/users', routerUser);
app.use('/api/posts', routerPost);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
