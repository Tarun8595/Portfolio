const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// POST route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your mail service
    auth: {
      user: "tarunkhuswaha456@gmail.com",       // Replace with your email
      pass: "hgso wsew zggf abld", // Use App Password if 2FA is enabled
    },
  });

  // Define email options
  const mailOptions = {
    from: email,
    to: "tarunkhuswaha456@gmail.com", // Your email
    subject: `New Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).send({ error: "Email sending failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
