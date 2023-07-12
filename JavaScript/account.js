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
    selectedEventsList.innerHTML = ''; 
  
    const selectedEvents = JSON.parse(localStorage.getItem('selectedEvents') || '[]');
    const filteredEvents = selectedEvents.filter(event => event.status === state);
  
    filteredEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
  
      const eventHTML = `
        <img src="${event.image}" alt="Evento">
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Price: ${event.price}</p>
        <p>Status: ${event.status}</p>
      `;
  
      eventCard.innerHTML = eventHTML;
      selectedEventsList.appendChild(eventCard);
    });
  }
  
});