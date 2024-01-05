import  express from 'express';
import {connectDB} from './src/config/db.js';
// import testRouter from './src/routes/test.route.js';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import publisherRouter from './src/routes/publisher.route.js';
import eventRouter from './src/routes/event.route.js';
import roomRouter from './src/routes/room.route.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import cors from 'cors';
import ticketRouter from './src/routes/ticket.route.js';
import multer from 'multer';

const app = express();

app.get('/', (req, res) => {
    res.send('ahihi')
})

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage()
})
app.use(upload.single())

// app.use("/api", testRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", publisherRouter);
app.use("/api", eventRouter);
app.use("/api", roomRouter);
app.use("/api", ticketRouter);
connectDB();

const PORT = 3000
app.listen(PORT, () => {
    console.log('server running on port' + PORT)
})
