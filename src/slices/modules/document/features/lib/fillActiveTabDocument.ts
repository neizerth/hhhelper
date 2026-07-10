import browser from "webextension-polyfill";

export const fillActiveTabDocument = async (content: string): Promise<void> => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    throw new Error("Active tab not found");
  }

  await browser.tabs.sendMessage(tab.id, {
    type: "fill-document",
    content,
  } satisfies { type: "fill-document"; content: string });
};
