type TextControl = HTMLInputElement | HTMLTextAreaElement;

type ValueTrackerElement = TextControl & {
  _valueTracker?: {
    setValue: (value: string) => void;
  };
};

const getPrototypeValueSetter = (element: TextControl) => {
  const prototype = Object.getPrototypeOf(element) as TextControl;

  return Object.getOwnPropertyDescriptor(prototype, "value")?.set;
};

const getInstanceValueSetter = (element: TextControl) => {
  return Object.getOwnPropertyDescriptor(element, "value")?.set;
};

export const setNativeValue = (element: TextControl, value: string) => {
  const instanceSetter = getInstanceValueSetter(element);
  const prototypeSetter = getPrototypeValueSetter(element);

  if (instanceSetter && prototypeSetter && instanceSetter !== prototypeSetter) {
    prototypeSetter.call(element, value);
    return;
  }

  if (prototypeSetter) {
    prototypeSetter.call(element, value);
    return;
  }

  element.value = value;
};

const resetReactTracker = (element: TextControl, previousValue: string) => {
  const tracker = (element as ValueTrackerElement)._valueTracker;

  if (tracker) {
    tracker.setValue(previousValue);
  }
};

const dispatchInput = (
  element: TextControl,
  inputType: string,
  data: string | null = null,
) => {
  element.dispatchEvent(
    new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      inputType,
      data,
    }),
  );
};

const applyValue = (element: TextControl, value: string) => {
  const previousValue = element.value;

  setNativeValue(element, value);
  resetReactTracker(element, previousValue);
  dispatchInput(element, "insertText", value);
};

const forceApplyValue = (element: TextControl, value: string) => {
  if (element.value !== value) {
    applyValue(element, value);
    return;
  }

  const previousValue = element.value;

  setNativeValue(element, "");
  resetReactTracker(element, previousValue);
  dispatchInput(element, "deleteContentBackward");

  applyValue(element, value);
};

export const fillTextControlValue = (element: TextControl, value: string) => {
  console.log("[hhhelper debug] fillTextControlValue called", {
    tag: element.tagName,
    isConnected: element.isConnected,
    currentValue: element.value,
    newValue: value,
    activeElement: document.activeElement,
    hasTracker: Boolean((element as ValueTrackerElement)._valueTracker),
    instanceSetter: Boolean(getInstanceValueSetter(element)),
    prototypeSetter: Boolean(getPrototypeValueSetter(element)),
  });

  if (!element.isConnected) {
    return;
  }

  if (document.activeElement !== element) {
    element.focus({ preventScroll: true });
  }

  forceApplyValue(element, value);
  element.dispatchEvent(new Event("change", { bubbles: true }));

  console.log("[hhhelper debug] after fill", {
    valueNow: element.value,
    activeElementNow: document.activeElement,
  });
};
