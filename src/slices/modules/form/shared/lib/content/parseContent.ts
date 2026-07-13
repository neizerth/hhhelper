import { isNotNil } from "ramda";
import { parseContentValue } from "./parseContentValue";

export const parseContent = (content: string) => {
  return content
    .split("\n")
    .map((expression) => {
      const separatorIndex = expression.indexOf(":");
      if (separatorIndex === -1) {
        return null;
      }

      const key = expression.slice(0, separatorIndex).trim();
      const value = expression.slice(separatorIndex + 1).trim();

      if (!key || !value) {
        return null;
      }

      return parseContentValue(key, value);
    })
    .filter(isNotNil);
};
