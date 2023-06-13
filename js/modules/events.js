import { getEventsByCategory, renderEvents } from './cache.js';
import { fetchEventsByCategory } from './api.js';

export async function showEventsByCategory(category) {
  const events = await getEventsByCategory(category);

  if (events) {
    renderEvents(events);
  } else {
    const fetchedEvents = await fetchEventsByCategory(category);
    renderEvents(fetchedEvents);
  }
}