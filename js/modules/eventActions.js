// Función para agregar o remover el evento de la lista de favoritos
export function toggleFavorite() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista de favoritos
  // Cambiar el estado del ícono de corazón lleno/vacío
  const icon = this.querySelector('i');
  icon.classList.toggle('fas');
  icon.classList.toggle('far');
}

// Función para agregar o remover el evento de la lista "Interested"
export function toggleInterested() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista "Interested"
  if (this.textContent === 'Interested') {
    // Cambiar el texto del botón a "Remove" o restaurar el texto original
    this.textContent = 'No longer interested?';
  } else {
    this.textContent = 'Interested';
  }
}

// Función para agregar o remover el evento de la lista "Going"
export function toggleGoing() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista "Going"
  if (this.textContent === 'Going!') {
    // Cambiar el texto del botón a "Your going to this event" o restaurar el texto original
    this.textContent = 'Your going to this event';
  } else {
    this.textContent = 'Going!';
  }
}