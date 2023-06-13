import { fetchEventsByCategory } from './api.js';

const eventCache = {};

const eventCacheProxy = new Proxy(eventCache, {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    const category = property;
    fetchEventsByCategory(category)
      .then(events => {
        target[property] = events;
      })
      .catch(error => {
        console.log(`Error al obtener los eventos de la categoría ${category}:`, error);
      });
    return null;
  },
});

export async function getEventsByCategory(category) {
  return eventCacheProxy[category];
}

export function renderEvents(events) {
  eventList.innerHTML = '';
  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    const eventHTML = `
      <img src="${event.image}" alt="Evento">
      <h3>${event.title}</h3>
      <p>Date: ${formatDate(event.date)}</p>
      <p>Location: ${formatLocation(event.location)}</p>
      <p>Price: ${formatPrice(event.price)}</p>
    `;
    eventElement.innerHTML = eventHTML;
    eventList.appendChild(eventElement);
  });
}

function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

function formatLocation(location) {
  if (location && location.place && location.city && location.state) {
    return `${location.place} • ${location.city}, ${location.state}`;
  } else {
    return 'Location information not available';
  }
}

function formatPrice(price) {
  if (price === 0) {
    return 'Free';
  } else {
    return `$${price.toFixed(2)}`;
  }
}