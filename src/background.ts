import browser from "webextension-polyfill";

import {
  reloadHhTabs,
  startContentScriptLiveReload,
} from "./background/liveReload";

if (import.meta.env.DEV) {
  startContentScriptLiveReload();
}

browser.runtime.onInstalled.addListener(async (details) => {
  if (import.meta.env.DEV && details.reason === "update") {
    await reloadHhTabs();
  }
});
