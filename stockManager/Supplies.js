class Supplies {
  constructor(type, model, quantity) {
    this.type = type;
    this.model = model;
    this.quantity = quantity;
    this.compatiblePrinter = [];
    if (this.type === "toner") {
      this.color = null;
    }
  }
}

module.exports = Supplies;
