class Printers {
  constructor(printerModel) {
    this.printerModel = printerModel;
  }
}

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

class StockManager {
  constructor() {
    this.Printers = [];
    this.Supplies = [];
  }

  // Métodos para Impressoras
  addPrinter(printerModel) {
    if (typeof printerModel == "string" && printerModel.trim().length > 0) {
      const exists = this.Printers.some(
        (printer) => printer.printerModel === printerModel
      );
      if (exists) return "Printer already exists";
      const newPrinter = new Printers(printerModel);
      this.Printers.push(newPrinter);
      return "Printer added successfully";
    }
    return "Invalid printer Model";
  }

  updatePrinter(oldModel, newModel) {
    if (typeof oldModel !== "string" || typeof newModel !== "string") {
      return "Invalid printer model format";
    }

    const printerIndex = this.Printers.findIndex(
      (printer) => printer.printerModel === oldModel
    );

    if (printerIndex === -1) {
      return "Printer not found";
    }

    const newModelExists = this.Printers.some(
      (printer) => printer.printerModel === newModel
    );

    if (newModelExists) {
      return "New printer model already exists";
    }

    // Atualizar referências nos suprimentos
    this.Supplies.forEach((supply) => {
      const index = supply.compatiblePrinter.indexOf(oldModel);
      if (index !== -1) {
        supply.compatiblePrinter[index] = newModel;
      }
    });

    this.Printers[printerIndex].printerModel = newModel;
    return "Printer updated successfully";
  }

  removePrinter(printerModel) {
    if (typeof printerModel !== "string") {
      return "Invalid printer model format";
    }

    const printerIndex = this.Printers.findIndex(
      (printer) => printer.printerModel === printerModel
    );

    if (printerIndex === -1) {
      return "Printer not found";
    }

    // Remover referências nos suprimentos
    this.Supplies.forEach((supply) => {
      const index = supply.compatiblePrinter.indexOf(printerModel);
      if (index !== -1) {
        supply.compatiblePrinter.splice(index, 1);
      }
    });

    this.Printers.splice(printerIndex, 1);
    return "Printer removed successfully";
  }

  getAllPrinters() {
    return this.Printers.map((printer) => printer.printerModel);
  }

  // Métodos para Suprimentos
  addSupplies(type, model, quantity, compatiblePrinter, color) {
    if (
      (type == "toner" || type == "drum") &&
      typeof model == "string" &&
      Number.isInteger(quantity) &&
      quantity >= 0
    ) {
      const exists = this.Supplies.some((supply) => supply.model === model);
      if (exists) return "Supply already exists";

      const newSupplies = new Supplies(type, model, quantity);

      if (type === "toner") {
        if (!color) {
          newSupplies.color = "black";
        } else if (typeof color == "string") {
          newSupplies.color = color;
        }
      }

      if (compatiblePrinter) {
        const printerList = Array.isArray(compatiblePrinter)
          ? compatiblePrinter
          : [compatiblePrinter];

        const nonExistentPrinters = printerList.filter(
          (printer) => !this.Printers.some((p) => p.printerModel === printer)
        );

        if (nonExistentPrinters.length > 0) {
          return `Printers not found: ${nonExistentPrinters.join(", ")}`;
        }
        newSupplies.compatiblePrinter.push(...printerList);
      }

      this.Supplies.push(newSupplies);
      return "Supply added successfully";
    } else {
      return "Invalid type or quantity";
    }
  }

  updateSupplyQuantity(model, quantity) {
    if (typeof model !== "string") {
      return "Invalid supply model format";
    }

    const supply = this.Supplies.find((s) => s.model === model);
    if (!supply) {
      return "Supply not found";
    }

    if (quantity === "+") {
      supply.quantity += 1;
      return "Supply quantity increased";
    } else if (quantity === "-") {
      if (supply.quantity > 0) {
        supply.quantity -= 1;
        return "Supply quantity decreased";
      } else {
        return "Cannot decrease quantity below 0";
      }
    } else if (Number.isInteger(quantity) && quantity >= 0) {
      supply.quantity = quantity;
      return "Supply quantity updated successfully";
    } else {
      return "Invalid quantity format";
    }
  }

  updateSupplyType(model, newType) {
    if (typeof model !== "string") {
      return "Invalid supply model format";
    }

    if (newType !== "toner" && newType !== "drum") {
      return "Invalid supply type. Must be 'toner' or 'drum'";
    }

    const supply = this.Supplies.find((s) => s.model === model);
    if (!supply) {
      return "Supply not found";
    }

    supply.type = newType;

    // Adicionar ou remover cor baseado no tipo
    if (newType === "toner" && !supply.color) {
      supply.color = "black";
    } else if (newType === "drum" && supply.color) {
      delete supply.color;
    }

    return "Supply type updated successfully";
  }

  updateSupplyModel(oldModel, newModel) {
    if (typeof oldModel !== "string" || typeof newModel !== "string") {
      return "Invalid supply model format";
    }

    const supply = this.Supplies.find((s) => s.model === oldModel);
    if (!supply) {
      return "Supply not found";
    }

    const newModelExists = this.Supplies.some((s) => s.model === newModel);
    if (newModelExists) {
      return "New supply model already exists";
    }

    supply.model = newModel;
    return "Supply model updated successfully";
  }

  updateCompatiblePrinter(model, printerModel) {
    if (typeof model !== "string" || typeof printerModel !== "string") {
      return "Invalid model format";
    }

    const supply = this.Supplies.find((s) => s.model === model);
    if (!supply) {
      return "Supply not found";
    }

    const printerExists = this.Printers.some(
      (p) => p.printerModel === printerModel
    );
    if (!printerExists) {
      return "Printer not found";
    }

    if (!supply.compatiblePrinter.includes(printerModel)) {
      supply.compatiblePrinter.push(printerModel);
      return "Compatible printer added successfully";
    } else {
      return "Printer already compatible with this supply";
    }
  }

  removeCompatiblePrinter(model, printerModel) {
    if (typeof model !== "string" || typeof printerModel !== "string") {
      return "Invalid model format";
    }

    const supply = this.Supplies.find((s) => s.model === model);
    if (!supply) {
      return "Supply not found";
    }

    const index = supply.compatiblePrinter.indexOf(printerModel);
    if (index !== -1) {
      supply.compatiblePrinter.splice(index, 1);
      return "Compatible printer removed successfully";
    } else {
      return "Printer not found in compatibility list";
    }
  }

  updateTonerColor(model, color) {
    if (typeof model !== "string" || typeof color !== "string") {
      return "Invalid input format";
    }

    const supply = this.Supplies.find((s) => s.model === model);
    if (!supply) {
      return "Supply not found";
    }

    if (supply.type !== "toner") {
      return "Color can only be updated for toner supplies";
    }

    supply.color = color;
    return "Toner color updated successfully";
  }

  remSupplies(model) {
    if (typeof model !== "string") {
      return "Invalid supply model format";
    }

    const supplyIndex = this.Supplies.findIndex((s) => s.model === model);
    if (supplyIndex === -1) {
      return "Supply not found";
    }

    this.Supplies.splice(supplyIndex, 1);
    return "Supply removed successfully";
  }
}
