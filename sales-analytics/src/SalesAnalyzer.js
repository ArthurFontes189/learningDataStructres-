DataLoader = require("./DataLoader/DataLoader");
ArrayList = require("./data-structures/ArrayList");
HashMap = require("./data-structures/HashMap");
class SalesAnalyzer {
  constructor() {
    this.sales = new ArrayList();
    this.customers = new HashMap();
    this.products = new HashMap();
    this.loadData();
  }

  loadData() {
    const sales = DataLoader.loadSales();
    const customers = DataLoader.loadCustomers();
    const products = DataLoader.loadProducts();
    sales.forEach((sale) => {
      const processedSale = {
        id: parseInt(sale.id),
        customer_id: parseInt(sale.customer_id),
        product_id: parseInt(sale.product_id),
        quantity: parseInt(sale.quantity),
        unit_price: parseFloat(sale.unit_price),
        sale_date: new Date(sale.sale_date),
        total_amount: parseFloat(sale.total_amount),
      };
      this.sales.add(processedSale);
    });

    customers.forEach((customer) => {
      const processedCustomer = {
        id: parseInt(customer.id),
        name: customer.name,
        email: customer.email,
        city: customer.city,
        registration_date: new Date(customer.registration_date),
        customer_type: customer.customer_type,
      };
      this.customers.put(processedCustomer.id, processedCustomer);
    });
    products.forEach((product) => {
      const processedProduct = {
        id: parseInt(product.id),
        name: product.name,
        category: product.category,
        price: parseFloat(product.price),
        cost: parseFloat(product.cost),
        supplier: product.supplier,
        description: product.description,
      };
      this.products.put(processedProduct.id, processedProduct);
    });
  }
  getTotalSales() {
    let totalSales = 0;
    for (let i = 0; i < this.sales.Getsize(); i++) {
      totalSales += this.sales.get(i).total_amount;
    }
    return totalSales.toFixed(2);
  }
  // SEPARAR OS METODOS EM ARQUIVOS DIFERENTES, PARA MELHOR ORGANIZAÇÃO.
  // TERMINAR DE FAZER TODAS AS FUNCIONABILIDADES DO SALES E IR PARA AS OUTRAS FUNCIONABILIDADES
}

const sales = new SalesAnalyzer();

sales.getTotalSales();
