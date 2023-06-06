import Cart from './cart.js';
import Product from './product.js';

document.addEventListener('DOMContentLoaded', function() {
  const cart = new Cart();

  function openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.add('show');
    displayCartItems();
  }

  function closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.remove('show');
  }

  function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    const products = cart.getProducts();

    products.forEach((product, index) => {
      const cartItem = document.createElement('div');
      cartItem.innerHTML = product.createMarkup();
      cartItemsContainer.appendChild(cartItem);

      const removeButton = cartItem.querySelector('.remove-button');
      removeButton.addEventListener('click', () => removeProduct(index));
    });
  }

  function addProductToCart(title, color, price, joke) {
    const product = new Product(title, color, price, joke);
    cart.addProduct(product);
  }

  function removeProduct(index) {
    cart.removeProduct(index);
    displayCartItems();
  }

  document.getElementById('open-cart-button').addEventListener('click', openCart);
  document.getElementById('close-cart-button').addEventListener('click', closeCart);

  document.getElementById('add-to-cart-button').addEventListener('click', () => {
    const title = document.getElementById('title').innerText;
    const color = document.querySelector('.color:checked').dataset.id;
    const price = document.getElementById('price').innerText;
    const joke = document.getElementById('selected-joke').innerText;

    addProductToCart(title, color, price, joke);
    displayCartItems();
  });

  const storedProducts = cart.getProducts();
  if (storedProducts.length > 0) {
    displayCartItems();
  }
});
