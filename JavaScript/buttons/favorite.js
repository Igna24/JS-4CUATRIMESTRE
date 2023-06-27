// Función para agregar o remover el evento de la lista de favoritos
export function toggleFavorite() {
  const eventId = this.getAttribute('data-event-id');
  // Lógica para agregar o remover el evento de la lista de favoritos
  // Cambiar el estado del ícono de corazón lleno/vacío
  const icon = this.querySelector('i');
  icon.classList.toggle('fas');
  icon.classList.toggle('far');
}