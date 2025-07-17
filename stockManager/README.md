# StockManager - Sistema de Gerenciamento de Estoque

Um sistema simples para gerenciar impressoras e suprimentos desenvolvido em JavaScript durante meu aprendizado de programação orientada a objetos.

## Sobre o Projeto

Este projeto nasceu da necessidade de praticar conceitos de JavaScript, especialmente classes e manipulação de dados. O sistema permite controlar um estoque de impressoras e suprimentos, mantendo a compatibilidade entre eles.
A inspiração para fazer este sistema veio de uma nescessidade do meu trabalho atual, onde estavamos precisando de um sistema de gerenciamento de estoque.

## Estrutura do Projeto

```
stockManager/
├── Printers.js        # Classe das impressoras
├── Supplies.js        # Classe dos suprimentos
└── StockManager.js    # Classe principal
```

## O que o sistema faz

### Impressoras

- Adiciona impressoras ao sistema
- Atualiza informações das impressoras
- Remove impressoras
- Lista todas as impressoras
- Valida dados para evitar duplicatas

### Suprimentos

- Adiciona suprimentos (toner ou drum)
- Controla quantidade em estoque
- Atualiza informações dos suprimentos
- Gerencia compatibilidade com impressoras
- Controla cores para toners
- Remove suprimentos

### Compatibilidade

- Vincula suprimentos a impressoras específicas
- Verifica se a impressora existe antes de vincular
- Mantém as referências atualizadas automaticamente

## As Classes

### Printers

Representa uma impressora no sistema.

```javascript
class Printers {
  constructor(printerModel) {
    this.printerModel = printerModel;
  }
}
```

### Supplies

Representa um suprimento (toner ou drum).

```javascript
class Supplies {
  constructor(type, model, quantity) {
    this.type = type; // "toner" ou "drum"
    this.model = model; // Modelo do suprimento
    this.quantity = quantity; // Quantidade em estoque
    this.compatiblePrinter = []; // Lista de impressoras compatíveis
    if (this.type === "toner") {
      this.color = null; // Cor do toner
    }
  }
}
```

### StockManager

A classe principal que gerencia todo o sistema.

## Métodos Disponíveis

### Para Impressoras

| Método                              | O que faz                       | Parâmetros                     |
| ----------------------------------- | ------------------------------- | ------------------------------ |
| `addPrinter(printerModel)`          | Adiciona uma impressora         | `printerModel`: String         |
| `updatePrinter(oldModel, newModel)` | Atualiza o modelo da impressora | `oldModel`, `newModel`: String |
| `removePrinter(printerModel)`       | Remove uma impressora           | `printerModel`: String         |
| `getAllPrinters()`                  | Lista todas as impressoras      | -                              |

### Para Suprimentos

| Método                                                         | O que faz                   | Parâmetros                                     |
| -------------------------------------------------------------- | --------------------------- | ---------------------------------------------- |
| `addSupplies(type, model, quantity, compatiblePrinter, color)` | Adiciona suprimento         | Vários parâmetros                              |
| `updateSupplyQuantity(model, quantity)`                        | Atualiza quantidade         | `model`: String, `quantity`: Number ou "+"/"-" |
| `updateSupplyType(model, newType)`                             | Atualiza tipo do suprimento | `model`: String, `newType`: "toner"/"drum"     |
| `updateSupplyModel(oldModel, newModel)`                        | Atualiza modelo             | `oldModel`, `newModel`: String                 |
| `remSupplies(model)`                                           | Remove suprimento           | `model`: String                                |

### Para Compatibilidade

| Método                                         | O que faz                | Parâmetros                      |
| ---------------------------------------------- | ------------------------ | ------------------------------- |
| `updateCompatiblePrinter(model, printerModel)` | Adiciona compatibilidade | `model`, `printerModel`: String |
| `removeCompatiblePrinter(model, printerModel)` | Remove compatibilidade   | `model`, `printerModel`: String |
| `updateTonerColor(model, color)`               | Atualiza cor do toner    | `model`, `color`: String        |

## Como usar

### 1. Importar e criar uma instância

```javascript
const StockManager = require("./stockManager/StockManager");
const manager = new StockManager();
```

### 2. Adicionar impressoras

```javascript
manager.addPrinter("HP LaserJet Pro M404");
manager.addPrinter("Canon imageCLASS MF445dw");
manager.addPrinter("Epson EcoTank L3150");
```

### 3. Adicionar suprimentos

```javascript
// Adicionar toner
manager.addSupplies("toner", "HP 58A", 10, ["HP LaserJet Pro M404"], "black");

// Adicionar drum
manager.addSupplies("drum", "Canon 057H", 5, ["Canon imageCLASS MF445dw"]);

// Toner colorido
manager.addSupplies("toner", "Epson 664", 8, ["Epson EcoTank L3150"], "cyan");
```

### 4. Gerenciar estoque

```javascript
// Aumentar quantidade
manager.updateSupplyQuantity("HP 58A", "+");

// Diminuir quantidade
manager.updateSupplyQuantity("HP 58A", "-");

// Definir quantidade específica
manager.updateSupplyQuantity("Canon 057H", 15);
```

### 5. Verificar informações

```javascript
// Listar todas as impressoras
console.log("Impressoras:", manager.getAllPrinters());

// Atualizar impressora (atualiza automaticamente as referências)
manager.updatePrinter("HP LaserJet Pro M404", "HP LaserJet Pro M405");
```

## Exemplo completo

```javascript
const StockManager = require("./stockManager/StockManager");

// Criar instância
const manager = new StockManager();

// Adicionar impressoras
manager.addPrinter("HP LaserJet Pro M404");
manager.addPrinter("Canon imageCLASS MF445dw");

// Adicionar suprimentos
manager.addSupplies("toner", "HP 58A", 10, ["HP LaserJet Pro M404"], "black");
manager.addSupplies("drum", "Canon 057H", 5, ["Canon imageCLASS MF445dw"]);

// Gerenciar estoque
manager.updateSupplyQuantity("HP 58A", "+");
manager.updateTonerColor("HP 58A", "blue");

// Verificar dados
console.log("Impressoras:", manager.getAllPrinters());
```

## Características técnicas

### Validações

- Verifica tipos de entrada
- Previne registros duplicados
- Mantém referências atualizadas automaticamente
- Não permite quantidades negativas
- Verifica se impressora existe antes de vincular suprimento

### Arquitetura

- Código organizado em módulos
- Uso de classes para organização
- Módulos reutilizáveis
- Fácil de expandir

### Conceitos aplicados

- Classes e objetos
- Módulos Node.js
- Manipulação de arrays (find, filter, map, some, etc.)
- Validação de dados
- Controle de estado

## O que aprendi

Durante o desenvolvimento deste projeto, pratiquei:

- JavaScript ES6+ (classes, arrow functions)
- Estruturas de dados (arrays, objetos)
- Programação orientada a objetos
- Organização de código em módulos
- Validação e tratamento de dados
- Lógica de negócio com regras de compatibilidade

## Melhorias futuras

- Salvar dados em arquivo JSON
- Criar testes para o código
- Fazer uma interface visual
- Adicionar relatórios
- Sistema de notificações
- Busca e filtros

## Licença

Projeto livre para uso educacional.
