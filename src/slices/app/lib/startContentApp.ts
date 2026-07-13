import { MessageRouter } from "@modules/browser/features/lib";
import { fillDocument } from "@modules/document/features/lib";

console.log("[hhhelper] content script loaded");

export const startContentApp = () => {
  console.log("[hhhelper] startContentApp");

  const router = new MessageRouter();

  router.on("fill-document", (content) => {
    void fillDocument({
      document,
      content,
    });
  });

  router.start();
};
