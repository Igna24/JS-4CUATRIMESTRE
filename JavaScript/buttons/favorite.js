export function toggleFavorite() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista de favoritos
  // Cambiar el estado del ícono de corazón lleno/vacío
  const icon = this.querySelector('i');
  icon.classList.toggle('fas');
  icon.classList.toggle('far');

  // Almacenar el evento seleccionado en el Local Storage
  const selectedEvents = JSON.parse(localStorage.getItem('selectedEvents') || '[]');
  const existingEventIndex = selectedEvents.findIndex(event => event.id === eventId);
  if (existingEventIndex !== -1) {
    selectedEvents.splice(existingEventIndex, 1);
  } else {
    selectedEvents.push({ id: eventId, status: 'favorite' });
  }
  localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
}
