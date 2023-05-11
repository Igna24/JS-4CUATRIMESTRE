import { getJoke } from '../modulesJokes/api.js';
import { setupButtons } from '../modulesJokes/buttonJokes.js';

// Función para mostrar un chiste
export function displayJoke(joke) {
  const jokeList = document.querySelector('#joke-list');
  const jokeItem = document.createElement('p');
  jokeItem.textContent = joke;
  jokeList.appendChild(jokeItem);
}

// Función para limpiar los chistes antiguos
export function clearJokes() {
  const jokeList = document.querySelector('#joke-list');
  jokeList.innerHTML = '';
}

getJoke()
setupButtons()