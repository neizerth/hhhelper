import browser from "webextension-polyfill";

import { sendMessageToTab } from "./sendMessageToTab";

const runFillInTab = (content: string) => {
  return globalThis.__hhhelperFill?.(content);
};

export const fillActiveTab = async (content: string): Promise<void> => {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) {
      throw new Error("Active tab not found");
    }

    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: runFillInTab,
      args: [content],
    });
  } catch {
    await sendMessageToTab("fill-document", content);
  }
};
