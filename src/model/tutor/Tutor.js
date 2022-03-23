import mongoose from 'mongoose';

const Tutor = new mongoose.Schema(
  {
    idRol: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    idDocument: {
      type: Number,
      require: true,
    },
    document: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    birthday: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('tutor', Tutor);
