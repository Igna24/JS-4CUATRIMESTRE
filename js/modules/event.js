// Obtén referencias a los elementos de las tabs y la lista de eventos
const musicTab = document.getElementById('musicTab');
const sportsTab = document.getElementById('sportsTab');
const businessTab = document.getElementById('businessTab');
const foodTab = document.getElementById('foodTab');
const artTab = document.getElementById('artTab');
const eventList = document.getElementById('eventList');

import { getEventsByCategory } from './cache.js';
import { showEventsByCategory } from './render.js';

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
