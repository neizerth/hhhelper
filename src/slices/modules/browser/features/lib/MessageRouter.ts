import browser from "webextension-polyfill";
import type { RouteType } from "../../shared/model";

type RouteHandler = (content: string) => void;
export class MessageRouter {
  routes: Partial<Record<RouteType, RouteHandler>> = {};

  on(type: RouteType, handler: RouteHandler) {
    this.routes[type] = handler;
  }

  start() {
    browser.runtime.onMessage.addListener((message) => {
      console.log("[hhhelper] MessageRouter", message);
      const handler = this.routes[message.type as RouteType];
      if (!handler) {
        throw new Error(`No handler registered for type: ${message.type}`);
      }
      handler(message.content);
    });
  }
}
