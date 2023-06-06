export default class Product {
  constructor(title, color, price, joke) {
    this.title = title;
    this.color = color;
    this.price = price;
    this.joke = joke;
  }

  createMarkup() {
    return `
      <div class="cart-item">
        <h3>${this.title} - ${this.color}</h3>
        <p>Precio: ${this.price}</p>
        <p>Chiste: ${this.joke}</p>
        <button class="remove-button">Remover</button>
      </div>
    `;
  }
}
