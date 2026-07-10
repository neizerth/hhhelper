import type { RouteType } from "../model";
import { getBrowserTabs } from "./getBrowserTabs";
import { sendMessageToBrowser } from "./sendMessageToBrowser";

export const sendMessageToTab = async (
  type: RouteType,
  content: string,
): Promise<void> => {
  const tabs = await getBrowserTabs();
  const [tab] = tabs;

  if (!tab?.id) {
    throw new Error("Active tab not found");
  }

  await sendMessageToBrowser({ type, content, tabId: tab.id });
};
