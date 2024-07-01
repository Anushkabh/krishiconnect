const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email_address', // Replace with your email
        pass: 'your_app_password'  // Replace with your email password
    }
});

// Email templates
const userAcknowledgmentTemplate = (name) => `
    <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #004d00;">Thanks for Connecting with KrishiConnect</h2>
            <p>Dear ${name},</p>
            <p>We have received your query. Our team will get back to you soon.</p>
            <p>Regards,<br>KrishiConnect Team</p>
        </body>
    </html>
`;

const adminNotificationTemplate = (name, email, message) => `
    <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #004d00;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        </body>
    </html>
`;

// Handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Send acknowledgment email to user
    const userMailOptions = {
        from: 'your_email_address', // Replace with your email
        to: email,
        subject: 'Thanks for Connecting with KrishiConnect',
        html: userAcknowledgmentTemplate(name)
    };

    // Send notification email to admin
    const adminMailOptions = {
        from: 'your_email_address', // Replace with your email
        to: 'your_email_address',  // Replace with your  email
        subject: 'New Contact Form Submission',
        html: adminNotificationTemplate(name, email, message)
    };

    // Send the acknowledgment email
    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending acknowledgment email:', error);
            return res.status(500).json({ message: 'Error sending acknowledgment email', error });
        }

        // Send the notification email to admin
        transporter.sendMail(adminMailOptions, (err, info) => {
            if (err) {
                console.error('Error sending admin notification email:', err);
                return res.status(500).json({ message: 'Error sending admin notification email', error: err });
            }
            res.status(200).json({ message: 'Emails sent successfully' });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
