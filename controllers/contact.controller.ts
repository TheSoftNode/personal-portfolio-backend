import multer from 'multer';
import { Request, Response } from 'express';
import path from 'path';
import Email from '../emails/email';
import catchAsync from '../utils/catchAsync';

// Configure multer to store files with the original name in the uploads folder
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'uploads/'); // Save to the 'uploads/' directory
    },
    filename: (req, file, cb) =>
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
    }
});

// Use multer with the customized storage configuration
export const upload = multer({ storage });


export const contact = catchAsync(async (req: Request, res: Response) =>
{
    try
    {
        const { name, email, subject, message } = req.body;
        const attachments = req.files;

        // Check if attachments is an object (with field names as keys) or an array
        let emailAttachments: Express.Multer.File[] = [];

        if (Array.isArray(attachments))
        {
            // If it's already an array, use it directly
            emailAttachments = attachments;
        } else if (attachments && typeof attachments === 'object')
        {
            // If it's an object, flatten it to get all files
            emailAttachments = Object.values(attachments).flat();
        }

        emailAttachments = emailAttachments.map(file =>
        {
            return {
                ...file,
                // Assuming the public URL for the uploaded files is '/uploads/'
                path: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
            };
        });

        console.log(emailAttachments);

        const from = `${name}<${email}>`;
        const to = "thesoftnode@gmail.com";

        const data = {
            user: { name, email, subject, message },
            emailAttachments
        };

        // Create an instance of your Email class and send the email
        const sendMail = new Email(to, data, from);
        const sendMailToClient = new Email(email, data, to);

        // Send the email with attachments
        await sendMail.send("client-contact.ejs", "New Contact Form Submission", emailAttachments);
        await sendMailToClient.send("contact.ejs", "Thank you for reaching out 🎉");

        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
});


