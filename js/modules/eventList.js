import { getEventsByCategory, fetchEventsByCategory } from './eventHelpers.js';
import { renderEvents } from './eventRenderer.js';
import { toggleFavorite, toggleInterested, toggleGoing } from './eventActions.js';

export const eventList = document.getElementById('eventList');

export async function showEventsByCategory(category) {
  const events = await getEventsByCategory(category);

  if (events) {
    renderEvents(events);
  } else {
    const fetchedEvents = await fetchEventsByCategory(category);
    renderEvents(fetchedEvents);
  }

  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  const interestedButtons = document.querySelectorAll('.interested-btn');
  const goingButtons = document.querySelectorAll('.going-btn');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', toggleFavorite);
  });

  interestedButtons.forEach(button => {
    button.addEventListener('click', toggleInterested);
  });

  goingButtons.forEach(button => {
    button.addEventListener('click', toggleGoing);
  });

  // Resto del código para marcar la tab seleccionada y actualizar la interfaz
}