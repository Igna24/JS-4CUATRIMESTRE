import { showEventsByCategory } from '../modules/eventList.js';

// Crea un arreglo con las categorías de los tabs
const categories = ['music', 'sports', 'business', 'food', 'art'];

// Recorre el arreglo y agrega los manejadores de eventos a cada tab
categories.forEach(category => {
  const tab = document.getElementById(`${category}Tab`);
  tab.addEventListener('click', () => {
    showEventsByCategory(category);
  });
});
