const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const nodemailer = require('nodemailer');
// midelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// ====
app.use(express.static(path.join(__dirname, 'public')));
// gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "megascript003@gmail.com", 
    pass: "lvwh uxqj omag sbkn", 
  },  
});

// Route to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: "", // Sender address
    to: "megascript003@gmail.com", // Receiver address (your email)
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// end

app.get('/', (req, res) => {        
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });            

app.listen(port, () => {        
  console.log(`Server is running on port ${port}`);
});