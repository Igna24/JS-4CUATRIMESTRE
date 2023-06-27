import { fetchEventsByCategory } from "../API/mainApi.js";

// Objeto para almacenar el caché de eventos
const eventCache = {};

// Proxy para manejar el caché de eventos
export const eventCacheProxy = new Proxy(eventCache, {
  get(target, property) {
    // Comprobar si la propiedad existe en el caché
    if (property in target) {
      return target[property];
    }

    // Si la propiedad no existe, realizar una solicitud al API y almacenar los datos en el caché
    const category = property;

    // Obtener los datos de eventos del API
    fetchEventsByCategory(category)
      .then(events => {
        target[property] = events; // Almacenar los datos en el caché
      })
      .catch(error => {
        console.log(`Error al obtener los eventos de la categoría ${category}:`, error);
      });

    return null; // Devolver null temporalmente hasta que los datos estén disponibles en el caché
  },
});

// Función para obtener los eventos de una categoría desde el caché o el API
export async function getEventsByCategory(category) {
  return eventCacheProxy[category];
}