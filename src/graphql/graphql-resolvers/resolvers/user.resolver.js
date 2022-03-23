import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../model/user/User';
import Event from '../../../model/event/Event';
import Tutor from '../../../model/tutor/Tutor';
import EnvModule from '../../../config/env/envModule';
import helpers from '../../../util/helpers';

EnvModule.configEnv();

const createToken = (user, secret, expiresIn) => {
  const { _id, email, name, phone } = user;
  return jwt.sign(
    {
      _id,
      email,
      name,
      phone,
    },
    secret,
    { expiresIn },
  );
};

const getUserFromToken = (req) => {
  const token = req.headers.authorization || null;
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      console.log(error);
    }
  }
};

const userResolver = {
  users: async () => await User.find(),
  usersByID: async ({ _id }) => await User.findOne({ _id }),
  usersByDoc: async ({ document }) => await User.findOne({ document }),
  createUser: async ({ user }) => {
    if (!user) {
      throw new Error('Fields required!');
    }
    try {
      const { password } = user;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async ({ user }) => {
    if (!user._id) {
      throw new Error('ID is required!');
    }
    const currentUser = await User.findOne({ _id: user._id });
    if (!currentUser) {
      throw new Error("That user doesn't exist!");
    }
    try {
      if (user.password) {
        const { password } = user;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      return await User.findOneAndUpdate({ _id: user._id }, user, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async ({ user }) => {
    if (!user) {
      throw new Error('ID is required');
    }
    try {
      await User.findOneAndDelete({ _id: user._id }, user);
      return `User with ID ${user._id} deleted`;
    } catch (error) {
      console.log(error);
    }
  },
  eventInsNot: async ({ mail, id }) => {
    if (!mail || !id) {
      throw new Error('Fields required!');
    }
    const currentUser = await User.findOne({ mail });
    const currentEvent = await Event.findOne({ id });
    const currentTutor = await Tutor.findOne({ _id: currentEvent.idTutor });
    if (!currentUser || !currentEvent || !currentTutor) {
      throw new Error('Fields incorrects!');
    }
    try {
      const account = {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        smtp: { host: 'smtp.gmail.com', port: 465, secure: true },
        web: 'https://mail.google.com',
      };
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      transporter.sendMail({
        from: `"Eventos UNAC" <${account.user}>`,
        to: mail,
        subject: `Te inscribiste en ${currentEvent.name}`,
        html: `<table style="width:400px; height:600px; font-family: Helvetica, sans-serif, Arial; color:white; border-radius: 5px" background="https://i.postimg.cc/FKRvnZd2/back-email.jpg">
        <tr>
          <th><h3 style="padding:10px">¡Hola ${currentUser.name}! Gracias por inscribirte a ${currentEvent.name}</h3></th>
        </tr>
        <tr>
          <td>
            <center>
              <img style="width: 100px; height: 100px;" src="https://cdn.icon-icons.com/icons2/317/PNG/512/calendar-clock-icon_34472.png"/>
            </center>
          </td>
        </tr>
          <tr>
          <td>
            <center>
              <ul style="padding: 15px">
                <p style="padding:3px">Fecha: ${currentEvent.date}</p>
                <p style="padding:3px">Hora de inicio: ${currentEvent.timeInit}</p>
                <p style="padding:3px">Duración: ${currentEvent.duration}</p>
                <p style="padding:3px">Numero de asistentes: ${currentEvent.assistentNumber}</p>
                <p style="padding:3px">Tutor: ${currentTutor.name}</p>
                <p style="padding:3px">Lugar: ${currentEvent.place}</p>
              </ul>
            </center>
          </td>
        </tr>
      </table>`,
      });
      return `Sent successfully to ${mail}`;
    } catch (error) {
      console.log(error);
    }
  },
  authenticateUser: async ({ user }) => {
    if (!user.mail || !user.password) {
      throw new Error('Fields required!');
    }
    const currentUser = await User.findOne({ mail: user.mail });
    if (!currentUser) {
      throw new Error("That user doesn't exist");
    }
    try {
      const passwordCorrect = await bcrypt.compare(user.password, currentUser.password);
      if (passwordCorrect) {
        return { token: createToken(user, process.env.SECRET, '12hr') };
      }
      return 'Password incorrect';
    } catch (error) {
      console.log(error);
    }
  },
};

export default userResolver;
