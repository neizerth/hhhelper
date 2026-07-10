import browser from "webextension-polyfill";

export const getBrowserTabs = async (): Promise<browser.Tabs.Tab[]> => {
  return browser.tabs.query({ active: true, currentWindow: true });
};
