import { fillDocument } from "@modules/document/features/lib";

declare global {
  // eslint-disable-next-line no-var
  var __hhhelperFill:
    | ((content: string) => ReturnType<typeof fillDocument>)
    | undefined;
}

globalThis.__hhhelperFill = (content) => {
  return fillDocument({ document, content });
};
