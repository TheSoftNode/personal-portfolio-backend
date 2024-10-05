import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export default class Email
{
  to: string;
  // name: string;
  data: object;
  from: string;

  constructor(user: any, data: object, from: string)
  {
    this.to = user.email;
    this.data = data;
    this.from = from;
  }

  newTransport()
  {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Send Actual Email
  async send(template: string, subject: string)
  {
    //get the path to the email template file
    const emailTemplatePath = path.join(
      __dirname,
      "../emails/mailTemplates",
      template
    );

    //Render the email template with EJS
    const html: string = await ejs.renderFile(emailTemplatePath, this.data);

    // Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async activateRegistration()
  {
    await this.send("activation-mail.ejs", "Activate Your Account");
  }

  async OrderConfirmation()
  {
    await this.send("order-confirmation.ejs", "Order Confirmation");
  }

  
}
