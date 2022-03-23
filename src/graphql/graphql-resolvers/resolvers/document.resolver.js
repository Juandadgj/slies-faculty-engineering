import Document from '../../../model/document/Document';

const documentResolver = {
  documents: async () => await Document.find(),
  documentsByID: async ({ id }) => Document.findOne({ id }),
  createDocument: async ({ document }) => {
    if (!document) {
      throw new Error('Fields required!');
    }
    try {
      const newDocument = new Document(document);
      return await newDocument.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateDocument: async ({ document }) => {
    if (!document.id) {
      throw new Error('ID is required!');
    }
    const currentDocument = await Document.findOne({ id: document.id });
    if (!currentDocument) {
      throw new Error("That user doesn't exist!'");
    }
    try {
      return await Document.findOneAndUpdate({ id: document.id }, document, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default documentResolver;
