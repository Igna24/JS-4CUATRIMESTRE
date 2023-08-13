import initializeForm from './form.js';
import recommendedPlant from './recommendation.js';

initializeForm();

const customizeButton = document.getElementById('customizeButton');

customizeButton.addEventListener('click', () => {
  const storedRecommendation =
    JSON.parse(localStorage.getItem('recommendation')) || recommendedPlant;
  const queryParams = new URLSearchParams(storedRecommendation);
  window.location.href = `customize.html?${queryParams.toString()}`;
});
