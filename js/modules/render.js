import { getEventsByCategory } from './cache.js';
import { fetchEventsByCategory } from './cache.js';

// Función para mostrar la lista de eventos según la categoría seleccionada
async function showEventsByCategory(category) {
  const events = await getEventsByCategory(category);

  if (events) {
    // Si los eventos están en el caché, mostrarlos directamente
    renderEvents(events);
  } else {
    // Si los eventos no están en el caché, realizar la solicitud al API y mostrarlos
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

// Función para renderizar los eventos en la interfaz
function renderEvents(events) {
  eventList.innerHTML = ''; // Limpiar la lista de eventos antes de agregar nuevos

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');

    const eventHTML = `
      <div class="event-img-container">
        <img src="${event.image}" alt="Evento">
        <button class="favorite-btn" data-event-id="${event.id}">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <h3>${event.title}</h3>
      <span class="event-date"><p>${formatDate(event.date)}</p></span>
      <span class="event-location"><p>${formatLocation(event.location)}</p></span>
      <span class="event-location"><p>${formatPrice(event.price)}</p></span>
      <div class="interaction-btns">
        <button class="interested-btn" data-event-id="${event.id}">
          Interested
        </button>
        <button class="going-btn" data-event-id="${event.id}">
          Going!
        </button>
      </div>
    `;

    eventElement.innerHTML = eventHTML;
    eventList.appendChild(eventElement);
  });
}

function toggleFavorite() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista de favoritos
  // Cambiar el estado del ícono de corazón lleno/vacío
  const icon = this.querySelector('i');
  icon.classList.toggle('fas');
  icon.classList.toggle('far');
}

function toggleInterested() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista "Interested"
  if (this.textContent === 'Interested') {
    // Cambiar el texto del botón a "Remove" o restaurar el texto original
    this.textContent = 'No longer interested?';
  } else {
    this.textContent = 'Interested';
  }
}

function toggleGoing() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista "Going"
  if (this.textContent === 'Going!') {
    // Cambiar el texto del botón a "Your going to this event" o restaurar el texto original
    this.textContent = 'Your going to this event';
  } else {
    this.textContent = 'Going!';
  }
}

// Función para formatear la fecha en el formato deseado
function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

// Función para formatear la ubicación en el formato deseado
function formatLocation(location) {
  if (location && location.place && location.city && location.state) {
    return `${location.place} • ${location.city}, ${location.state}`;
  } else {
    return 'Location information not available';
  }
}

// Función para formatear el precio en el formato deseado
function formatPrice(price) {
  if (price === 0) {
    return 'Free';
  } else {
    return `$${price.toFixed(2)}`;
  }
}

export { showEventsByCategory };
