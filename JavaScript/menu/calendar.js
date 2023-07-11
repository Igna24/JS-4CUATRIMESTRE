const calendarElement = document.getElementById('calendar');

const currentDate = new Date();

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

export function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const numDays = lastDay.getDate();
  let startDayIndex = firstDay.getDay();

  let calendarHTML = '<table>';
  calendarHTML += '<caption>';
  calendarHTML += '<button onclick="prevMonth()">&lt;</button>';
  calendarHTML += months[month] + ' ' + year;
  calendarHTML += '<button onclick="nextMonth()">&gt;</button>';
  calendarHTML += '</caption>';
  calendarHTML += '<tr>';

  for (let i = 0; i < daysOfWeek.length; i++) {
    calendarHTML += '<th>' + daysOfWeek[i] + '</th>';
  }

  calendarHTML += '</tr><tr>';

  let dayCount = 1;

  for (let i = 0; i < startDayIndex; i++) {
    calendarHTML += '<td></td>';
  }

  while (dayCount <= numDays) {
    if (startDayIndex % 7 === 0 && startDayIndex !== 0) {
      calendarHTML += '</tr><tr>';
    }

    calendarHTML += '<td>' + dayCount + '</td>';

    dayCount++;
    startDayIndex++;
  }

  while (startDayIndex % 7 !== 0) {
    calendarHTML += '<td></td>';
    startDayIndex++;
  }

  calendarHTML += '</tr>';
  calendarHTML += '</table>';
  calendarElement.innerHTML = calendarHTML;
}

window.prevMonth = function() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }

  generateCalendar(currentYear, currentMonth);
};

window.nextMonth = function() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }

  generateCalendar(currentYear, currentMonth);
};

generateCalendar(currentYear, currentMonth);