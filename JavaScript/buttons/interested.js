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