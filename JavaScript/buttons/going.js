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