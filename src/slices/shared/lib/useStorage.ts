import browser from "webextension-polyfill";

export const useStorage = (key: string) => {
  const load = async () => {
    const result = await browser.storage.local.get(key);
    const content = result[key];
    return typeof content === "string" ? content : "";
  };

  const save = async (content: string) => {
    await browser.storage.local.set({ [key]: content });
  };

  return [load, save];
};
