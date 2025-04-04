import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
