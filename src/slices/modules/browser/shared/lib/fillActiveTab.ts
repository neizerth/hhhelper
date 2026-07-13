import browser from "webextension-polyfill";

import { sendMessageToTab } from "./sendMessageToTab";

const runFillInTab = (content: string) => {
  return globalThis.__hhhelperFill?.(content) ?? { error: "handler not found" };
};

export const fillActiveTab = async (content: string): Promise<string> => {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) {
      throw new Error("Active tab not found");
    }

    const [injection] = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: runFillInTab,
      args: [content],
    });

    return `ok, result=${JSON.stringify(injection?.result)}`;
  } catch (error) {
    try {
      await sendMessageToTab("fill-document", content);
      return `executeScript failed (${String(error)}), fallback via message ok`;
    } catch (fallbackError) {
      return `both failed: executeScript=${String(error)}, message=${String(fallbackError)}`;
    }
  }
};
