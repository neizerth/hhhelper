import browser from "webextension-polyfill";
import type { RouteType } from "../model";

type Options = {
  type: RouteType;
  content: string;
  tabId: number;
};

export const sendMessageToBrowser = async ({
  type,
  content,
  tabId,
}: Options): Promise<void> => {
  await browser.tabs.sendMessage(tabId, {
    type,
    content,
  });
};
