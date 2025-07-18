class HashMap {
  constructor() {
    this.map = new Map();
  }

  put(key, value) {
    return this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }
  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    this.map.delete(key);
    return true;
  }
  clear() {
    this.map.clear();
  }
  size() {
    return this.map.size;
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return this.map.values();
  }
}

module.exports = HashMap;
