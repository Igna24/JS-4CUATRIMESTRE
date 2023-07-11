export function toggleInterested() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista "Interested"
  if (this.textContent === 'Interested') {
    // Cambiar el texto del botón a "Remove" o restaurar el texto original
    this.textContent = 'No longer interested?';

    // Almacenar el evento seleccionado en el Local Storage
    const selectedEvents = JSON.parse(localStorage.getItem('selectedEvents') || '[]');
    selectedEvents.push({ id: eventId, status: 'interested' });
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  } else {
    this.textContent = 'Interested';
  }
}
