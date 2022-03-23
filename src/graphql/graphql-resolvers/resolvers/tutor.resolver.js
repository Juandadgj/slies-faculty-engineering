import Tutor from '../../../model/tutor/Tutor';

const tutorResolver = {
  tutors: async () => await Tutor.find(),
  tutorsByDoc: async ({ document }) => await Tutor.findOne({ document }),
  createTutor: async ({ tutor }) => {
    if (!tutor) {
      throw new Error('Fields required!');
    }
    try {
      const newTutor = new Tutor(tutor);
      return await newTutor.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateTutor: async ({ tutor }) => {
    if (!tutor._id) {
      throw new Error('ID is required!');
    }
    const currentTutor = await Tutor.findOne({ _id: tutor._id });
    if (!currentTutor) {
      throw new Error("That user doesn't exist!");
    }
    try {
      return await Tutor.findOneAndUpdate({ _id: tutor._id }, tutor, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteTutor: async ({ tutor }) => {
    if (!tutor) {
      throw new Error('ID is required');
    }
    try {
      await Tutor.findOneAndDelete({ _id: tutor._id }, tutor);
      return `Tutor with ID ${tutor._id} deleted`;
    } catch (error) {
      console.log(error);
    }
  },
};

export default tutorResolver;
