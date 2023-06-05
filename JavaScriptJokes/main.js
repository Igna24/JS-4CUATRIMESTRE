import { getJoke } from '../modulesJokes/api.js';
import { setupButtons } from '../modulesJokes/buttonJokes.js';

// Función para mostrar un chiste
export function displayJoke(joke) {
  const jokeList = document.querySelector('#joke-list');
  const jokeAnchor = document.createElement('a')
  const jokeItem = document.createElement('p');
  jokeAnchor.href='product.html'
  jokeAnchor.appendChild(jokeItem)
  jokeItem.textContent = joke;
  jokeList.appendChild(jokeAnchor);
}

// Función para limpiar los chistes antiguos
export function clearJokes() {
  const jokeList = document.querySelector('#joke-list');
  jokeList.innerHTML = '';
}

getJoke()
setupButtons()