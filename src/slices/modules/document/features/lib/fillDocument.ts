import { MonthSelect, RegionSelect } from "@/slices/modules/form/entities/lib";
import { Checkbox, Input, TextArea } from "@/slices/modules/form/shared/lib";
import { parseContent } from "@/slices/modules/form/shared/lib/content";
import type { IFormControl } from "@/slices/modules/form/shared/model";
import { equalsIgnoreCase } from "@/slices/shared/util";
import { getDocumentControls } from "./documentControls";

type Options = {
  document: Document;
  content: string;
};

const controls = [Input, TextArea, Checkbox, MonthSelect, RegionSelect];

export const fillDocument = async ({ document, content }: Options) => {
  const values = parseContent(content);
  const used = new Set<IFormControl<any, any>>();

  const findByLabel = (label: string) => {
    const documentControls = getDocumentControls({ document, controls });
    return documentControls.find(
      (c) => c.label && equalsIgnoreCase(c.label, label) && !used.has(c),
    );
  };

  const filled: string[] = [];
  const missing: string[] = [];

  for (const item of values) {
    const control = findByLabel(item.key);
    if (!control) {
      missing.push(item.key);
      continue;
    }

    used.add(control);
    await control.fill(item.value);
    filled.push(item.key);
  }

  return {
    parsedCount: values.length,
    controlsOnPage: getDocumentControls({ document, controls }).length,
    filled,
    missing,
  };
};
