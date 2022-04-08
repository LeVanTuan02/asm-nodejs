import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();
const USER = "levantuan.fpoly@gmail.com";
const PASSWORD = "scostukdjevvgdaf";

router.post("/sendMail", (req, res) => {
    const { from_name, to_name, to_email, subject, html_content } = req.body;

    const transporter =  nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: true,
        auth: {
            user: USER,
            pass: PASSWORD
        }
    });

    const mainOptions = {
        from: `${from_name} <${USER}>`,
        to: `${to_name} <${to_email}>`,
        subject,
        text: 'For clients with plaintext support only',
        html: html_content
    }

    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            res.status(400).json({
                err
            })
        } else {
            res.json({
                info
            })
        }
    });

});

export default router;