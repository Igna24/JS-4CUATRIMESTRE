import { eventList } from './eventList.js';
import { showEventsByCategory } from './eventList.js';
import { toggleInterested } from '../buttons/interested.js';
import { toggleGoing } from '../buttons/going.js';

export function addEventHandlers() {
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

  eventList.addEventListener('click', (event) => {
    if (event.target.matches('.favorite-btn')) {
      toggleFavorite.call(event.target);
    } else if (event.target.matches('.interested-btn')) {
      toggleInterested.call(event.target);
    } else if (event.target.matches('.going-btn')) {
      toggleGoing.call(event.target);
    }
  });
}
