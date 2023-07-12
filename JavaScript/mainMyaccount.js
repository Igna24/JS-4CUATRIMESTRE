import { generateCalendar } from './menu/calendar.js';

const calendarElement = document.getElementById('calendar');
const currentDate = new Date();

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());