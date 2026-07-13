import { isNotNil } from "ramda";
import { parseContentValue } from "./parseContentValue";

const KEY_LINE = /^([^:]+):\s?(.*)$/;
const BLOCK_DELIMITER = "```";

const parseKeyLine = (line: string) => {
  const match = line.match(KEY_LINE);
  if (!match) {
    return null;
  }

  const key = match[1].trim();
  if (!key) {
    return null;
  }

  return {
    key,
    value: match[2],
  };
};

const readBlock = (lines: string[], startIndex: number) => {
  const blockLines: string[] = [];
  let index = startIndex;

  while (index < lines.length && lines[index].trim() !== BLOCK_DELIMITER) {
    blockLines.push(lines[index]);
    index += 1;
  }

  if (index < lines.length) {
    index += 1;
  }

  return {
    value: blockLines.join("\n").trim(),
    nextIndex: index,
  };
};

export const parseContent = (content: string) => {
  const lines = content.split("\n");
  const entries: { key: string; value: string }[] = [];

  let index = 0;
  while (index < lines.length) {
    const keyLine = parseKeyLine(lines[index]);
    if (!keyLine) {
      index += 1;
      continue;
    }

    const { key, value: rest } = keyLine;
    const trimmedRest = rest.trim();

    if (trimmedRest === BLOCK_DELIMITER) {
      const block = readBlock(lines, index + 1);
      entries.push({ key, value: block.value });
      index = block.nextIndex;
      continue;
    }

    if (trimmedRest.startsWith(BLOCK_DELIMITER)) {
      let inner = trimmedRest.slice(BLOCK_DELIMITER.length);
      if (inner.endsWith(BLOCK_DELIMITER)) {
        inner = inner.slice(0, -BLOCK_DELIMITER.length);
      }

      entries.push({ key, value: inner.trim() });
      index += 1;
      continue;
    }

    if (
      trimmedRest === "" &&
      index + 1 < lines.length &&
      lines[index + 1].trim() === BLOCK_DELIMITER
    ) {
      const block = readBlock(lines, index + 2);
      entries.push({ key, value: block.value });
      index = block.nextIndex;
      continue;
    }

    entries.push({ key, value: trimmedRest });
    index += 1;
  }

  return entries
    .map(({ key, value }) => {
      if (!value) {
        return null;
      }

      return parseContentValue(key, value);
    })
    .filter(isNotNil);
};
