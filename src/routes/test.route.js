// import express from "express";
// import UserModel from "../models/User.js";
// const testRouter = express.Router();
// import multer from "multer";
// //import firebase from "../config/firebase.js";
// import { bucket } from "../config/firebase.js";

// testRouter.use(express.urlencoded({ extended: false }))
// testRouter.use(express.json({ extended: false }))

// const upload = multer({
//     storage: multer.memoryStorage()
// })

// testRouter.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send("Error: No files found")
//     }

//     const blob = bucket.file(req.file.originalname)

//     const blobWriter = blob.createWriteStream({
//         metadata: {
//             contentType: req.file.mimetype
//         }
//     })

//     blobWriter.on('error', (err) => {
//         console.log(err)
//         res.status(500).send("Error uploading file.")
//     })

//     blobWriter.on('finish', async () => {
//         // Generate a public URL for the uploaded file
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

//         // You can save the public URL to the database or use it as needed
//         // For example, you can update the user's profile with the image URL

//         // Here, we are just sending the URL in the response
//         res.status(200).send({ message: "File uploaded.", imageUrl: publicUrl });
//     })

//     blobWriter.end(req.file.buffer)
// })

// export default testRouter;
