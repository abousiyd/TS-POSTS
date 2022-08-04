const storage = {
  setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string) {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  },
  clearItem(key: string) {
    localStorage.removeItem(key);
  },
};

export default storage;
