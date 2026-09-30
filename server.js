import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log('Incoming origin:', req.headers.origin);
    next();
});

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 8000
})
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((err) => console.log('DB Error:', err.message));

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
});

async function sendNotification({ name, email, phone, subject, message }) {
    const html = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
    const mailSubject = `Portfolio [${subject}]: from ${name}`;

    if (process.env.RESEND_API_KEY) {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Portfolio <onboarding@resend.dev>',
                to: [process.env.RESEND_TO || process.env.EMAIL_USER],
                reply_to: email,
                subject: mailSubject,
                html
            })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Resend ${response.status}: ${text}`);
        }
        return 'resend';
    }

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: mailSubject,
        html
    });
    return 'gmail';
}

app.get('/', (req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    console.log('Form received from:', name);

    try {
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();
        console.log('Saved to MongoDB');

        sendNotification({ name, email, phone, subject, message })
            .then((via) => console.log('Mail sent via', via))
            .catch((mailError) => console.error('Mail Error:', mailError.message));

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Save Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));