import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortenedUrl: { type: String, required: true },
    shortenedId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }  // This will automatically add createdAt and updatedAt fields
);

const Url = mongoose.model('Url', urlSchema);
export default Url;
