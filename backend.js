import nodemailer from "nodemailer"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('DB Error:', err.message));

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  subject: { type: String, required: true }
});
const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, subject } = req.body;
  console.log('form received:', name, email, phone, message, subject);

  if (!name || !email || !message || !subject) {
    return res.status(400).json({ success: false, message: "required field missing" });
  }

  try {
    await Contact.create({ name, email, phone, message, subject });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio: ${subject} - ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
      });
      console.log('mail sent');
    } catch (mailError) {
      console.log('mail error:', mailError.message);
    }

    res.status(200).json({ success: true, message: "Thank you message sent successfully" });
  } catch (error) {
    console.log("save error:", error.message);
    res.status(500).json({ success: false, message: "could not save message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
