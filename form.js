import PlantBuilder from './builder.js';
import recomendedPlant from './recommendation.js';
import handleClearButton from './clearButton.js';

export default function initializeForm() {
  const form = document.getElementById('form');
  const plantContainer = document.getElementById('recommendation');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const place = document.querySelector('input[name="place"]:checked');
    const sunlight = document.querySelector('input[name="sunlight"]:checked');
    const pets = document.querySelector('input[name="pets"]:checked');
    const water = document.querySelector('input[name="water"]:checked');
    const style = document.querySelector('input[name="style"]:checked');
    const extras = Array.from(
      document.querySelectorAll('input[name="extras"]:checked'),
    );

    if (place && sunlight && pets && water && style) {
      const builder = new PlantBuilder();

      if (place.value === 'inside_indirect') {
        builder.withName('Sansevieria').withPlantImage('plant-sansevieria');
      } else if (place.value === 'inside_lot') {
        builder.withName('Aglaonema').withPlantImage('plant-aglaonema');
      } else if (place.value === 'outside') {
        builder.withName('Aloe').withPlantImage('plant-aloe');
      }

      if (sunlight.value === 'yes') {
        builder.withSoil('Composted Soil');
      } else if (sunlight.value === 'no') {
        builder.withSoil('Fertilized Soil');
      }

      if (pets.value === 'yes') {
        builder.withPot('ceramic-unpainted');
        builder.withPotStyle('Substitute the soil for the easy drainage soil');
      } else if (pets.value === 'no') {
        builder.withPot('ceramic-unpainted');
      }

      if (water.value === 'overwater') {
        builder.withPotMaterial('pot-clay-simple-blue');
      } else if (water.value === 'underwater' || water.value === 'neither') {
        builder.withPotMaterial('ceramic-unpainted');
      }

      if (style.value === 'minimalism') {
        builder.withPotStyle('pot-ceramic-blue');
      } else if (style.value === 'decoration') {
        builder.withPotStyle('pot-ceramic-decorated-green');
      } else if (style.value === 'bright_colors') {
        builder.withPotStyle('pot-ceramic-decorated-purple');
      }

      const extrasList = extras.map((extra) => extra.value);
      builder.withExtras(extrasList);

      const recommendation = builder.build();

      recomendedPlant(recommendation, plantContainer);

      localStorage.setItem('recommendation', JSON.stringify(recommendation));
    } else {
      // eslint-disable-next-line no-alert
      alert('Please check all boxes');
    }
  });

  const storedRecommendation = JSON.parse(
    localStorage.getItem('recommendation'),
  );
  if (storedRecommendation) {
    recomendedPlant(storedRecommendation, plantContainer);
  }

  handleClearButton(form, plantContainer);
}
