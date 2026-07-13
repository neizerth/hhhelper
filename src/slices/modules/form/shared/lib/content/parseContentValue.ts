import type { ContentValue } from "../../model/content";

const BOOLEAN_VALUES = [
  "да",
  "нет",
  "true",
  "false",
  "1",
  "0",
  "yes",
  "no",
  "y",
  "n",
];

const TRUTHY_VALUES = ["да", "true", "1", "yes", "y"];

export const parseContentValue = (key: string, value: string): ContentValue => {
  const v = value.toLowerCase();

  if (!value.includes("\n") && BOOLEAN_VALUES.includes(v)) {
    return {
      key,
      type: "boolean",
      value: TRUTHY_VALUES.includes(v),
    };
  }

  return {
    key,
    type: "text",
    value,
  };
};
