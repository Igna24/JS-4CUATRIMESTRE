import { showEventsByCategory } from './modules/events.js';

const musicTab = document.getElementById('musicTab');
const sportsTab = document.getElementById('sportsTab');
const businessTab = document.getElementById('businessTab');
const foodTab = document.getElementById('foodTab');
const artTab = document.getElementById('artTab');

musicTab.addEventListener('click', () => {
  showEventsByCategory('music');
});

sportsTab.addEventListener('click', () => {
  showEventsByCategory('sports');
});

businessTab.addEventListener('click', () => {
  showEventsByCategory('business');
});

foodTab.addEventListener('click', () => {
  showEventsByCategory('food');
});

artTab.addEventListener('click', () => {
  showEventsByCategory('art');
});