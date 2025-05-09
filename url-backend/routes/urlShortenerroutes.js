import express from 'express';
import shortid from 'shortid';
import Url from '../models/UrlModel.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Shorten URL route
router.post('/shorten', authenticate, async (req, res) => {
  const { originalUrl } = req.body;
  const shortenedId = shortid.generate();
  const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortenedId}`;

  try {
    const newUrl = new Url({
      originalUrl,
      shortenedUrl,
      shortenedId,
      userId: req.user.userId,
    });
    await newUrl.save();
    res.json({ shortenedUrl });
  } catch (err) {
    res.status(500).json({ message: 'Error shortening URL.' });
  }
});

// Get user URL history
// GET /url/history
router.get('/history', authenticate, async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.userId }); // Ensure the correct user is fetched
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching URL history.' });
  }
});
// Delete a shortened URL
router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const result = await Url.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!result) return res.status(404).json({ message: 'URL not found.' });
    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting URL.' });
  }
});

// GET /url/stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.userId }); // Ensure using req.user.userId

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);

    let todayCount = 0,
      yesterdayCount = 0,
      thisWeekCount = 0,
      lastWeekCount = 0;

    urls.forEach(url => {
      const createdAt = new Date(url.createdAt);
      if (createdAt >= startOfToday) todayCount++;
      else if (createdAt >= startOfYesterday && createdAt < startOfToday) yesterdayCount++;
      if (createdAt >= startOfWeek) thisWeekCount++;
      if (createdAt >= startOfLastWeek && createdAt < endOfLastWeek) lastWeekCount++;
    });

    res.json({
      total: urls.length,
      today: todayCount,
      yesterday: yesterdayCount,
      thisWeek: thisWeekCount,
      lastWeek: lastWeekCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
