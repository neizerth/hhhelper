import browser from "webextension-polyfill";

const STORAGE_KEY = "hhhelper:content";

export const loadContent = async (): Promise<string> => {
  const result = await browser.storage.local.get(STORAGE_KEY);
  const content = result[STORAGE_KEY];

  return typeof content === "string" ? content : "";
};

export const saveContent = async (content: string): Promise<void> => {
  await browser.storage.local.set({ [STORAGE_KEY]: content });
};
