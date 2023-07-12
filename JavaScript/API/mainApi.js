// Función para realizar una solicitud al API y obtener los eventos de una categoría
export async function fetchEventsByCategory(category) {
  const response = await fetch(`https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`);
  const eventData = await response.json();
  return eventData;
}