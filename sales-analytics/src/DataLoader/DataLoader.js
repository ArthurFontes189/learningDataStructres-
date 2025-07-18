const fs = require("fs");
const path = require("path");

class DataLoader {
  static loadSales() {
    return this.parseCsv(path.join(__dirname, "../data/sales.csv"));
  }
  static loadCustomers() {
    return this.parseCsv(path.join(__dirname, "../data/customers.csv"));
  }
  static loadProducts() {
    return this.parseCsv(path.join(__dirname, "../data/products.csv"));
  }

  static parseCsv(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const header = lines[0].trimEnd().split(",");
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(",");
      const obj = {};

      header.forEach((header, index) => {
        obj[header] = values[index];
      });
      data.push(obj);
    }
    return data;
  }
}

module.exports = DataLoader;
