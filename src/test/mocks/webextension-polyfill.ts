const store = new Map<string, unknown>();

const browser = {
  runtime: {
    onMessage: {
      addListener: () => {},
    },
    reload: async () => {},
    getURL: (path: string) => `chrome-extension://test/${path}`,
  },
  scripting: {
    executeScript: async () => [{}],
  },
  storage: {
    local: {
      get: async (key: string) => ({ [key]: store.get(key) }),
      set: async (items: Record<string, unknown>) => {
        for (const [key, value] of Object.entries(items)) {
          store.set(key, value);
        }
      },
    },
  },
  tabs: {
    query: async () => [{ id: 1 }],
    reload: async () => {},
    sendMessage: async () => {},
  },
};

export default browser;
