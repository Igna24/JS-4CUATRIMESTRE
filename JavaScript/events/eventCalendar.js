import { getEventsByCategory } from './eventHelpers.js';

export function showEventsOnCalendar(year, month) {
  const calendarElement = document.getElementById('calendar');
  const calendarDays = calendarElement.getElementsByClassName('calendar-day');

  Array.from(calendarDays).forEach(async dayElement => {
    const dayNumber = parseInt(dayElement.textContent);

    const events = await getEventsByCategory('Businnes'); // si se utiliza "All" o "Events" se crea un bucle de solicitudes al API el cual da como error relacionado con las políticas de seguridad CORS

    const eventsOnDay = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === dayNumber;
    });

    if (eventsOnDay.length > 0) {
      const eventList = document.createElement('ul');
      eventList.classList.add('event-list');

      eventsOnDay.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = event.title;
        eventList.appendChild(listItem);
      });

      dayElement.appendChild(eventList);
    }
  });
}
