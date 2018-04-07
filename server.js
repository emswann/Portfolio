const express    = require('express');
const bodyParser = require('body-parser');
const path       = require("path");
const nodemailer = require('nodemailer');

const app = express();

const env = require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/api/send/mail/", (req, res) => {
  var mailOptions = {
    from: process.env.USER,
    to: process.env.WORK,
    subject: req.body.subject,
    text: "Contact information: \n" + req.body.name + "\n" + req.body.email + "\n" + req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    var statusCode = 200;
    if (error) {
      console.log(error);
      statusCode = 500;
    }
    else {
      console.log("Email sent: " + info.response);
    }

    res.status(statusCode).end();
  });
});

app.listen(port, () => console.log("Server listening on: http://localhost:" + port));

