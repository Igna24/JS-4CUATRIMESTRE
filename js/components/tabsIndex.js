import { showEventsByCategory } from '../modules/eventList.js';

// Obtén referencias a los elementos de las tabs
const musicTab = document.getElementById('musicTab');
const sportsTab = document.getElementById('sportsTab');
const businessTab = document.getElementById('businessTab');
const foodTab = document.getElementById('foodTab');
const artTab = document.getElementById('artTab');

// Agrega manejadores de eventos a cada tab
musicTab.addEventListener('click', () => {
  showEventsByCategory('music');
});

sportsTab.addEventListener('click', () => {
  showEventsByCategory('sports');
});

businessTab.addEventListener('click', () => {
  showEventsByCategory('business');
});

foodTab.addEventListener('click', () => {
  showEventsByCategory('food');
});

artTab.addEventListener('click', () => {
  showEventsByCategory('art');
});

// Resto del código para marcar la tab seleccionada y actualizar la interfaz
