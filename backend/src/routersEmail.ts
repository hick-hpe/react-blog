import nodemailer from "nodemailer";
import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const routerEmail: Router = Router();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Erro de conexão SMTP:", error);
    } else {
        console.log("SMTP conectado com sucesso:", success);
    }
});


console.log('email: ', process.env.EMAIL_USER);
console.log('pass: ', process.env.EMAIL_PASS);

routerEmail.post("/", async (req:Request, res:Response):Promise<Response|any> => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Mensagem do formulário de contato`,
        html: `<h1>Mensagem do formulário de contato</h1>`,
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        res.status(500).json({ message: "Erro ao enviar mensagem." });
    }
});

export default routerEmail;