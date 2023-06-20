import { renderEvents } from './modules/eventRenderer.js';
import { getEventsByCategory, fetchEventsByCategory } from './modules/eventHelpers.js';
import { toggleFavorite, toggleInterested, toggleGoing } from './modules/eventActions.js';
import { showEventsByCategory } from './modules/eventList.js';
import state from '../state.js';

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

// Agrega event listeners a los botones de eventos
eventList.addEventListener('click', (event) => {
  if (event.target.matches('.favorite-btn')) {
    toggleFavorite.call(event.target);
  } else if (event.target.matches('.interested-btn')) {
    toggleInterested.call(event.target);
  } else if (event.target.matches('.going-btn')) {
    toggleGoing.call(event.target);
  }
});
