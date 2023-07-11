document.addEventListener('DOMContentLoaded', function() {
  const selectedEventsList = document.getElementById('selectedEventsList');
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const state = this.getAttribute('data-state');
      showFilteredEvents(state);
    });
  });

  function showFilteredEvents(state) {
    selectedEventsList.innerHTML = ''; // Vaciar contenido actual

    const selectedEvents = JSON.parse(localStorage.getItem('selectedEvents') || '[]');
    const filteredEvents = selectedEvents.filter(event => event.status === state);

    filteredEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.textContent = `Event ID: ${event.id}, Status: ${event.status}`;
      selectedEventsList.appendChild(eventElement);
    });
  }
});
