// server.js
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const name = firstName + " " + lastName;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_GMAIL, // Your Gmail email address
      pass: process.env.MY_PASSWORD, // Your Gmail password or an app password for security
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "My personal Website",
      link: "https://your-product-website.com/",
    },
  });

  const emailContent = {
    body: {
      greeting: "Hello Yvette",
      intro: `You have received a new message from ${name}.`,
      outro: `
      <p>${message}</p>
      <p>Please call me back on ${phone}</p>
      <p>${email}</p>
      
      `,
      signature: `Best Regards,\n ${firstName}`,
    },
  };

  const emailBody = mailGenerator.generate(emailContent);

  const mailOptions = {
    subject: "Please Contact me",
    from: email,
    to: process.env.MY_GMAIL,
    replyTo: email,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending the email:", error);
      res.status(500).json({ message: "Error sending the message." });
    } else {
      console.log("Email sent successfully:", info.response);
      res.status(201).json({
        message: "Thank you for contacting us! We will get back to you soon.",
      });
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
