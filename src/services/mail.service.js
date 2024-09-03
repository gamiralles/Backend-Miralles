import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass,
      },
    });
    this.from = "gmiralles.pas@gmail.com";
  }

  getTemplate(firstName) {
    let body = `<h2>Benvenido a nuestro sitio ${firstName}</h2>`;
    return body;
  }

  getTemplatePurchase(firstName, code) {
    let body = `<h2>Muchas gracias por tu compra ${firstName}!</h2>`;
    body += `<p>Su código de compra es: ${code}</p>`;
    return body;
  }

  async sendMail(to, subject, firstName) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html: this.getTemplate(firstName),
      });
      return info;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async sendMailPurchase(to, subject, firstName, code) {
    try {
      const info = await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html: this.getTemplatePurchase(firstName, code),
      });
      return info;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const mailService = new MailService();

export default mailService;
