import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routesAuth";
import routerUser from "./routersUser";
import routerPost from "./routersPost";
// import routerEmail from "./routersEmail";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const HOST = process.env.HOST || '192.168.3.27';
const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.COOKIE_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV == 'development' ? false : true
    }
}));

app.use('/auth', router);
app.use('/api/users', routerUser);
app.use('/api/posts', routerPost);
// app.use('/send-email', routerEmail);

app.use('/', (req:Request, res:Response) => {
    res.json({
        message: "It's working!!!",
        date: new Date()
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    console.log(new Date().toISOString());
    console.log('----------------------------------');
});
