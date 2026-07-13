import type {
  IFormControl,
  IFormControlConstructor,
} from "@/slices/modules/form/shared/model";
import { queryAll } from "@/slices/shared/util";

type Options = {
  document: Document;
  controls: IFormControlConstructor<any, any>[];
};

const cache = new WeakMap<Node, IFormControl<any, any>>();

export const getDocumentControls = (options: Options) => {
  const { document } = options;

  return options.controls.flatMap((Control) => {
    const list = queryAll(Control.selector, document);

    return Array.from(list)
      .filter((node) => node.isConnected)
      .map((node) => {
        const cached = cache.get(node);
        if (cached) {
          return cached;
        }

        const control = new Control(node as never);
        cache.set(node, control);
        return control;
      });
  });
};
