import { describe, expect, it } from "vitest";
import { parseContent } from "./parseContent";

describe("parseContent", () => {
  it("parses single-line key-value pairs", () => {
    expect(parseContent("Компания: ООО Ромашка")).toEqual([
      { key: "Компания", type: "text", value: "ООО Ромашка" },
    ]);
  });

  it("parses boolean values", () => {
    expect(parseContent("Работаю сейчас: нет")).toEqual([
      { key: "Работаю сейчас", type: "boolean", value: false },
    ]);
  });

  it("parses multiline values in triple backtick blocks", () => {
    expect(
      parseContent(`Чем занимались?: \`\`\`
Разработка фронтенда
Сайт: https://example.com
Внедрение CI/CD
\`\`\`
Компания: ООО Ромашка`),
    ).toEqual([
      {
        key: "Чем занимались?",
        type: "text",
        value:
          "Разработка фронтенда\nСайт: https://example.com\nВнедрение CI/CD",
      },
      { key: "Компания", type: "text", value: "ООО Ромашка" },
    ]);
  });

  it("parses multiline blocks when delimiter starts on the next line", () => {
    expect(
      parseContent(`Описание:
\`\`\`
первая строка
вторая: строка
\`\`\``),
    ).toEqual([
      {
        key: "Описание",
        type: "text",
        value: "первая строка\nвторая: строка",
      },
    ]);
  });

  it("parses inline backtick blocks on one line", () => {
    expect(parseContent("Заметка: ```короткий текст```")).toEqual([
      { key: "Заметка", type: "text", value: "короткий текст" },
    ]);
  });

  it("ignores lines outside key-value pairs", () => {
    expect(parseContent("случайная строка\nКомпания: ООО")).toEqual([
      { key: "Компания", type: "text", value: "ООО" },
    ]);
  });
});
