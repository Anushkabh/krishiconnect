const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const your_email = ""; // Replace with your email
const password = ""; // Replace with your email password or app password

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: your_email, 
        pass: password
    }
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

    const userMailOptions = {
        from: your_email,
        to: email,
        subject: 'Thanks for Connecting with KrishiConnect',
        html: userAcknowledgmentTemplate(name)
    };

    const adminMailOptions = {
        from: your_email,
        to: your_email,
        subject: 'New Contact Form Submission',
        html: adminNotificationTemplate(name, email, message)
    };

    transporter.sendMail(userMailOptions, (error) => {
        if (error) {
            console.error('Error sending acknowledgment email:', error);
            return res.status(500).json({ message: 'Error sending acknowledgment email' });
        }

        transporter.sendMail(adminMailOptions, (err) => {
            if (err) {
                console.error('Error sending admin notification email:', err);
                return res.status(500).json({ message: 'Error sending admin notification email' });
            }
            res.status(200).json({ message: 'Emails sent successfully' });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
