import { getEventsByCategory } from './eventHelpers.js';
import { renderEvents } from './eventRenderer.js';
import { toggleFavorite } from '../buttons/favorite.js';
import { toggleInterested } from '../buttons/interested.js';
import { toggleGoing } from '../buttons/going.js';
import { fetchEventsByCategory } from '../API/mainApi.js';

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
}