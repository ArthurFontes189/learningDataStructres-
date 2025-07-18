class ArrayList {
  constructor() {
    this.data = [];
    this.size = 0;
  }

  add(element) {
    this.data[this.size] = element;
    this.size++;
  }

  get(index) {
    if (index < 0 || index > this.size) {
      return "index not found";
    }
    return this.data[index];
  }

  remove(index) {
    if (index < 0 || index > this.size) {
      return "Invalid index to remove";
    }

    const removed = this.data.splice(index, 1)[0];

    this.size = this.data.length;

    return removed;
  }

  indexOf(element) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return i;
      }
    }
    return -1;
  }

  Getsize() {
    return this.size;
  }

  clear() {
    this.data = [];
    this.size = 0;
  }
  contains(element) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return true;
      }
    }
    return false;
  }
  isEmpty() {
    return this.size === 0;
  }
}

module.exports = ArrayList;
