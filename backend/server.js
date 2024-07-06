const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

const your_email = process.env.YOUR_EMAIL; // Environment variable for your email
const password = process.env.PASSWORD; // Environment variable for your email password or app password

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: your_email,
    pass: password,
  },
});

// Email templates
const userAcknowledgmentTemplate = (name) => `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #e0f7e9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                <img src="https://i.imgur.com/HCwChEK.png" alt="Logo" style="width: 100px; margin-bottom: 20px;">
                <h2 style="color: #004d00;">Thanks for Connecting with KrishiConnect</h2>
                <p>Dear ${name},</p>
                <p>We have received your query. Our team will get back to you soon.</p>
                <p>Regards,<br>KrishiConnect Team</p>
            </div>
        </body>
    </html>
`;

const adminNotificationTemplate = (name, email, message) => `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #e0f7e9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                <img src="https://i.imgur.com/HCwChEK.png" alt="Logo" style="width: 100px; margin-bottom: 20px;">
                <h2 style="color: #004d00;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            </div>
        </body>
    </html>
`;

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userMailOptions = {
    from: your_email,
    to: email,
    subject: 'Thanks for Connecting with KrishiConnect',
    html: userAcknowledgmentTemplate(name),
  };

  const adminMailOptions = {
    from: your_email,
    to: your_email,
    subject: 'New Contact Form Submission',
    html: adminNotificationTemplate(name, email, message),
  };

  transporter.sendMail(userMailOptions, (error) => {
    if (error) {
      console.error('Error sending acknowledgment email:', error);
      return res
        .status(500)
        .json({ message: 'Error sending acknowledgment email' });
    }

    transporter.sendMail(adminMailOptions, (err) => {
      if (err) {
        console.error('Error sending admin notification email:', err);
        return res
          .status(500)
          .json({ message: 'Error sending admin notification email' });
      }
      res.status(200).json({ message: 'Emails sent successfully' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
