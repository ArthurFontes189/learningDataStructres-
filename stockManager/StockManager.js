const Printers = require("./Printers");
const Supplies = require("./Supplies");

class StockManager {
  constructor() {
    this.Printers = [];
    this.Supplies = [];
  }

  // Métodos para Impressoras
  addPrinter(printerModel) {
    //Verifica se o parametro é uma string e não é vazia
    if (typeof printerModel == "string" && printerModel.trim().length > 0) {
      // Verifica na array printerModel se existe alguma outra impressora ja adicionada com este nome
      const exists = this.Printers.some(
        (printer) => printer.printerModel === printerModel
      );
      // Se existir retornará que a impressora ja existe
      if (exists) return "Printer already exists";
      // cria a nova impressora apos todas as verificações
      const newPrinter = new Printers(printerModel);
      // adiciona a nova impressora na array
      this.Printers.push(newPrinter);
      // retorna que foi adicionada com sucesso
      return "Printer added successfully";
    }
    // caso o valor passado pelo parametro não seja validado, ira retornar o erro
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
    //verifica se o parametro passado não é uma string e retorna o erro caso não seja
    if (typeof printerModel !== "string") {
      return "Invalid printer model format";
    }
    // utiliza o metodo findIndex para ver se tem algum printerModel igual ao parametro passado, caso tenha, retornara o indice dele
    const printerIndex = this.Printers.findIndex(
      (printer) => printer.printerModel === printerModel
    );
    // Caso o valor retornado do printerIndex seja -1, quer dizer que o valor não foi encontrado, então ele é inexistente
    if (printerIndex === -1) {
      //retornara que a impressora nao foi achada
      return "Printer not found";
    }

    this.Supplies.forEach((supply) => {
      // acessa cada elemento dos materiais, e vê se as impressoras compativeis são a mesma que está sendo removida
      const index = supply.compatiblePrinter.indexOf(printerModel);
      //caso o valor seja diferente de -1, ou seja, existe, ele ira remover da array utilizando o metodo splice
      if (index !== -1) {
        supply.compatiblePrinter.splice(index, 1);
      }
    });
    // utiliza o metodo splice para remover a impressora da array
    this.Printers.splice(printerIndex, 1);
    //retorna que a impressora foi removida com sucesso
    return "Printer removed successfully";
  }

  getAllPrinters() {
    // Utilizando o map para melhor vizualização da array de impressoras, e retornando
    return this.Printers.map((printer) => printer.printerModel);
  }

  // Métodos para Suprimentos
  addSupplies(type, model, quantity, compatiblePrinter, color) {
    //fazendo as verificações de type, para saber se é toner ou drum
    //depois se o valor quantity é inteiro
    //logo apos ver se o valor quantity é não negativo
    if (
      (type == "toner" || type == "drum") &&
      typeof model == "string" &&
      Number.isInteger(quantity) &&
      quantity >= 0
    ) {
      //verifica utilizando o metodo some para ver se o supply ja existe na array de supply
      const exists = this.Supplies.some((supply) => supply.model === model);
      // se existir retorna que ja tem um supply existente
      if (exists) return "Supply already exists";
      // Cria o supply
      const newSupplies = new Supplies(type, model, quantity);
      // verifica se o type é igual a toner
      if (type === "toner") {
        //verifica se color nao existe
        if (!color) {
          //apos verificar que nao existe adiciona valor ao color
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

module.exports = StockManager;
