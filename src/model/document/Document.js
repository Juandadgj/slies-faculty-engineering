import mongoose from 'mongoose';

const Document = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    document: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('document', Document);
