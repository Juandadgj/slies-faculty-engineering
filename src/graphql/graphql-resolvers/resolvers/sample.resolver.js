import Sample from '../../../model/sample/Sample';
import helpers from '../../../util/helpers';

const sampleResolver = {
  samples: async () => await Sample.find(),
  newSample: async (sample) => {
    helpers.dateHelpers.addMonthToDate(new Date(), 2);
    try {
      const newsample = new Sample(sample);
      newsample.save();
    } catch (error) {
      console.log(error);
    }
  },
};

export default sampleResolver;
