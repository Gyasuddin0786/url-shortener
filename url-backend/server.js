import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/authroutes.js';
import urlRouter from './routes/urlShortenerroutes.js';
import Url from './models/UrlModel.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());

// ✅ Redirect route before other routes
app.get('/:shortenedId', async (req, res) => {
  try {
    const { shortenedId } = req.params;
    const urlData = await Url.findOne({ shortenedId });
    if (!urlData) return res.status(404).json({ message: 'URL not found.' });
    return res.redirect(urlData.originalUrl);
  } catch (err) {
    return res.status(500).json({ message: 'Error during redirection.' });
  }
});
// origin setup here
app.use(cors({
  origin: [
    "https://apnaurl-shortener.netlify.app", // netlify deployed site
    "http://localhost:5173" // local development
    //"https://url-shortener-web-eta.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use('/auth', authRouter);
app.use('/url', urlRouter);
app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
  console.log("Server is running successfully...");
});
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection failed:', err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
