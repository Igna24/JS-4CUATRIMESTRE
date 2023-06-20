import { eventList } from './eventList.js';
import { formatDate, formatLocation, formatPrice } from '../helpers/format.js';

// Función para renderizar los eventos en la interfaz
export function renderEvents(events) {
  eventList.innerHTML = ''; // Limpiar la lista de eventos antes de agregar nuevos

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');

    const eventHTML = `
      <img src="${event.image}" alt="Evento">
      <h3>${event.title}</h3>
      <p>Date: ${formatDate(event.date)}</p>
      <p>Location: ${formatLocation(event.location)}</p>
      <p>Price: ${formatPrice(event.price)}</p>
      <button class="favorite-btn" data-event-id="${event.id}">
        <i class="far fa-heart"></i>
      </button>
      <button class="interested-btn" data-event-id="${event.id}">
        Interested
      </button>
      <button class="going-btn" data-event-id="${event.id}">
        Going!
      </button>
    `;

    eventElement.innerHTML = eventHTML;
    eventList.appendChild(eventElement);
  });
}