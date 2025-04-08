import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routesAuth";
import routerUser from "./routersUser";
import routerPost from "./routersPost";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const HOST = process.env.HOST || '192.168.3.27';
const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 5000;

const allowedOrigins = [
    'http://192.168.3.27:5175',
    'http://localhost:5175'
]
app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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

app.use('/', (req: Request, res: Response) => {
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
