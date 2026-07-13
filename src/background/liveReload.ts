import browser from "webextension-polyfill";

const HH_TAB_URLS = ["https://hh.ru/*", "https://*.hh.ru/*"];
const CONTENT_SCRIPT_PATH = "src/content.js";
const WATCH_INTERVAL_MS = 800;

const hashContent = (text: string) => `${text.length}:${text.slice(0, 64)}`;

const getContentScriptHash = async () => {
  const url = browser.runtime.getURL(CONTENT_SCRIPT_PATH);
  const response = await fetch(`${url}?t=${Date.now()}`);

  if (!response.ok) {
    throw new Error(`Failed to read ${CONTENT_SCRIPT_PATH}`);
  }

  return hashContent(await response.text());
};

export const reloadHhTabs = async () => {
  const tabs = await browser.tabs.query({ url: HH_TAB_URLS });

  await Promise.all(
    tabs.map((tab) => (tab.id ? browser.tabs.reload(tab.id) : undefined)),
  );
};

export const startContentScriptLiveReload = () => {
  let contentHash: string | undefined;

  const watchContentScript = async () => {
    try {
      const nextHash = await getContentScriptHash();

      if (contentHash !== undefined && nextHash !== contentHash) {
        await browser.runtime.reload();
        return;
      }

      contentHash = nextHash;
    } catch (error) {
      console.warn("[hhhelper] content script watch failed", error);
    }
  };

  void watchContentScript();
  setInterval(() => {
    void watchContentScript();
  }, WATCH_INTERVAL_MS);
};
