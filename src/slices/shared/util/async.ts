type WaitForOptions = {
  timeout?: number;
  interval?: number;
};

export const waitFor = <T>(
  getValue: () => T | null | undefined,
  { timeout = 2000, interval = 50 }: WaitForOptions = {},
): Promise<T | null> => {
  return new Promise((resolve) => {
    const start = Date.now();

    const check = () => {
      const value = getValue();
      if (value) {
        resolve(value);
        return;
      }

      if (Date.now() - start >= timeout) {
        resolve(null);
        return;
      }

      setTimeout(check, interval);
    };

    check();
  });
};
