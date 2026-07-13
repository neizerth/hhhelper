export const equalsIgnoreCase = (a: string, b: string) => {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
};

export const containsIgnoreCase = (a: string, b: string) => {
  return a.trim().toLowerCase().includes(b.trim().toLowerCase());
};
