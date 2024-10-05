import express from 'express';
import multer from 'multer';
import path from 'path';
import Email from '../emails/email';

const router = express.Router();

// Set up Multer storage as described above
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) =>
    {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        cb(null, `${name}-${timestamp}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit files to 5 MB
    },
    fileFilter: (req, file, cb) =>
    {
        const fileTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype)
        {
            return cb(null, true);
        }
        cb(new Error('Error: File type not supported!'));
    },
});

// Change the route to handle multiple files
router.post("/contact", upload.array("attachments"), async (req, res) =>
{
    try
    {
        const { name, email, subject, message } = req.body;
        const attachments = req.files as Express.Multer.File[];

        const from = `${name}<${email}>`;
        const to = "thesoftnode@gmail.com";

        const data = {
            user: { name, email, subject, message },
          };

        // Create an instance of your Email class and send the email
        const emailInstance = new Email(to, data, from);

        // Send the email with attachments
        await emailInstance.send("client-contact.ejs", "New Contact Form Submission", attachments);

        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

export default router;
