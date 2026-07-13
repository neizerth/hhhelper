export type ContentValue = { key: string } & (
  | {
      type: "text";
      value: string;
    }
  | { type: "boolean"; value: boolean }
);
