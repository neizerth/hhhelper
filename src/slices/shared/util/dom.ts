type Context = Document | Element;

export const queryAll = (selector: string, context: Context) =>
  context.querySelectorAll(selector);

export const queryOne = (selector: string, context: Context) =>
  context.querySelector(selector);
