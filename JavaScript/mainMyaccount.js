import { initializeCalendar } from './menu/calendar.js';
$(document).ready(function() {
  $('.tab[data-tab="calendar"]').click(function() {
    initializeCalendar();
  });
});