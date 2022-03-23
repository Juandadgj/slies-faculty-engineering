import mongoose from 'mongoose';

const User = new mongoose.Schema(
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
    password: {
      type: String,
      requiered: true,
    },
    institutionalCode: {
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
      required: true,
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
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('user', User);
