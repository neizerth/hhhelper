import { beforeEach, describe, expect, it, vi } from "vitest";
import { fillTextControlValue } from "./value";

describe("fillTextControlValue", () => {
  let textarea: HTMLTextAreaElement;

  beforeEach(() => {
    textarea = document.createElement("textarea");
    document.body.append(textarea);
  });

  it("updates value through react tracker", () => {
    textarea.value = "old";
    const tracker = { setValue: vi.fn() };
    Object.assign(textarea, { _valueTracker: tracker });

    fillTextControlValue(textarea, "new");

    expect(textarea.value).toBe("new");
    expect(tracker.setValue).toHaveBeenCalled();
  });

  it("reapplies the same value", () => {
    textarea.value = "same";
    const tracker = { setValue: vi.fn() };
    Object.assign(textarea, { _valueTracker: tracker });

    fillTextControlValue(textarea, "same");

    expect(textarea.value).toBe("same");
    expect(tracker.setValue).toHaveBeenCalled();
  });
});
