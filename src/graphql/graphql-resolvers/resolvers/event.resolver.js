import Event from '../../../model/event/Event';

const eventResolver = {
  events: async ({ filter }) => await Event.find(filter),

  eventByID: async ({ id }) => await Event.find({ id }),

  eventByName: async ({ name }) => await Event.find({ name }),

  eventByDate: async ({ date }) => await Event.find({ date }),

  eventByTutor: async ({ idTutor }) => await Event.find({ idTutor }),

  eventByClosingDate: async ({ closingDateRegistration }) =>
    await Event.find({ closingDateRegistration }),

  eventByFinished: async ({ finished }) => await Event.find({ finished }),

  createEvent: async ({ event }) => {
    if (!event) {
      throw new Error('Fields required!');
    }
    try {
      const newEvent = new Event(event);
      return await newEvent.save();
    } catch (error) {
      console.log(error);
    }
  },

  updateEvent: async ({ event }) => {
    if (!event.id) {
      throw new Error('ID Fields required!');
    }

    const currentEvent = await Event.findOne({ id: event.id });

    if (!currentEvent) {
      throw new Error("Event doesn't exist!");
    }
    try {
      return await Event.findOneAndUpdate({ id: event.id }, event, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteEvent: async ({ event }) => {
    if (!event) {
      throw new Error('ID event is required!');
    }
    try {
      await Event.findOneAndDelete({ id: event.id });
      return `Event with ID ${event.id} was deleted`;
    } catch (error) {
      console.log(error);
    }
  },
};

export default eventResolver;
