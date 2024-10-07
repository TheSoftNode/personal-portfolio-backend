import express from "express";
import { contact, upload } from "../controllers/contact.controller";

const router = express.Router();


router.route("/contact").post(upload.array("attachments"), contact);


export default router;
