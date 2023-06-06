export default class Cart {
  constructor() {
    this.products = this.getStoredProducts();
  }

  getStoredProducts() {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  storeProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct(product) {
    this.products.push(product);
    this.storeProducts();
  }

  removeProduct(index) {
    this.products.splice(index, 1);
    this.storeProducts();
  }

  removeAllProducts() {
    this.products = [];
    this.storeProducts();
  }

  getProducts() {
    return this.products;
  }
}
