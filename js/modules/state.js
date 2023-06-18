// Singleton para manejar el estado de la aplicación
const State = (() => {
  // Datos privados del state
  let state = {
    favorites: [],
    interested: [],
    going: [],
  };

  // Métodos para acceder y modificar los datos del state
  return {
    getFavorites() {
      return [...state.favorites];
    },
    getInterested() {
      return [...state.interested];
    },
    getGoing() {
      return [...state.going];
    },
    addToFavorites(event) {
      state.favorites.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addToInterested(event) {
      state.interested.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addToGoing(event) {
      state.going.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromFavorites(eventId) {
      state.favorites = state.favorites.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromInterested(eventId) {
      state.interested = state.interested.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromGoing(eventId) {
      state.going = state.going.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
  };
})();

// Inicializar el state con los datos almacenados en localStorage (si existen)
const storedState = localStorage.getItem('state');
if (storedState) {
  State.state = JSON.parse(storedState);
}

export default State;
