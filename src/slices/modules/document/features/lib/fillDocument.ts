type Options = {
  document: Document;
  content: string;
};

export const fillDocument = ({ document, content }: Options) => {
  console.log("[hhhelper] fillDocument", document, content);
};
