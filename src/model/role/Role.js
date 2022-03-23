import mongoose from 'mongoose';

const Role = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('role', Role);
