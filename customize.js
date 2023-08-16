import recommendedPlant from './recommendation.js';

function loadPreviewImages(data) {
  const plantPreviewImage = document.getElementById('plantPreviewImage');
  plantPreviewImage.innerHTML = '';

  const potColor = data.potColor || 'unpainted';
  const potStyle = data.potStyle === 'Decorated pot' ? 'decorated-' : '';

  const selectedMaterial = document.querySelector(
    'input[name="potMaterial"]:checked',
  );
  const selectedMaterialValue = selectedMaterial
    ? selectedMaterial.value
    : 'ceramic';

  const potImage = document.createElement('img');
  potImage.id = 'potImage';
  potImage.src = `./assets/images/pot-${selectedMaterialValue}-${potStyle}${potColor.toLowerCase()}.png`;
  plantPreviewImage.appendChild(potImage);

  const plantImage = document.createElement('img');
  plantImage.src = `./assets/images/plant-${data.name}.png`;
  plantPreviewImage.appendChild(plantImage);

  const soilImage = document.createElement('img');
  soilImage.src = `./assets/images/soil-${data.soil.replace(' Soil', '')}.png`;
  plantPreviewImage.appendChild(soilImage);

  data.extras.forEach((extra) => {
    const extraImage = document.createElement('img');
    extraImage.src = `./assets/images/${extra}.png`;
    plantPreviewImage.appendChild(extraImage);
  });
}

function loadPreviewData(data) {
  document.getElementById('previewPlantName').textContent = data.name;
  document.getElementById('previewSoil').textContent = data.soil;
  document.getElementById('previewPot').textContent = data.pot;
  document.getElementById('previewPotColor').textContent = data.potColor;
  document.getElementById('previewExtras').textContent = Array.isArray(
    data.extras,
  )
    ? data.extras.join(', ')
    : '';
  loadPreviewImages(data);
}

document.addEventListener('DOMContentLoaded', () => {
  const customizeForm = document.getElementById('customizeForm');
  const potColorToggle = document.getElementById('potColorToggle');
  const potColorOptions = document.getElementById('potColorOptions');
  const plantPreviewImage = document.getElementById('plantPreviewImage');
  const plantSelect = document.getElementById('plantSelect');
  const soilOptions = document.querySelectorAll('input[name="soil"]');
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

  if (potColorToggle) {
    potColorToggle.addEventListener('change', () => {
      if (potColorToggle.checked) {
        potColorOptions.style.display = 'block';
      } else {
        potColorOptions.style.display = 'none';
      }
    });
  }

  if (customizeForm) {
    const updatePreview = () => {
      const formData = new FormData(customizeForm);
      const selectedPlant = plantSelect.value;
      const potDecorations = formData.get('potDecorations');
      const potColor = formData.get('potColor');
      const potMaterial = formData.get('potMaterial');
      const soil = formData.get('soil');
      const selectedExtras = Array.from(extrasCheckboxes)
        .filter((chk) => chk.checked)
        .map((chk) => chk.value);

      const customizedRecommendation = {
        name: selectedPlant,
        soil,
        pot: '',
        potStyle: potDecorations === 'on' ? 'Decorated pot' : 'pot',
        potColor: potColor || 'unpainted',
        extras: selectedExtras,
        potMaterial,
      };

      localStorage.setItem(
        'recommendation',
        JSON.stringify(customizedRecommendation),
      );

      recommendedPlant(customizedRecommendation, plantPreviewImage);
      loadPreviewData(customizedRecommendation);
    };

    customizeForm.addEventListener('change', (event) => {
      if (
        (event.target.name === 'potColor' ||
          event.target.name === 'potMaterial') &&
        potColorToggle.checked
      ) {
        const selectedColor = customizeForm.elements.potColor.value;
        const selectedMaterial = customizeForm.elements.potMaterial.value;
        const potImage = document.getElementById('potImage');
        const potStyle = customizeForm.elements.potDecorations.checked
          ? 'decorated-'
          : '';
        if (potImage) {
          potImage.src = `./assets/images/pot-${selectedMaterial.toLowerCase()}-${potStyle}${selectedColor.toLowerCase()}.png`;
        }
      }
      updatePreview();
    });

    plantSelect.addEventListener('change', updatePreview);

    soilOptions.forEach((option) => {
      option.addEventListener('change', updatePreview);
    });

    extrasCheckboxes.forEach((chk) => {
      chk.addEventListener('change', updatePreview);
    });

    const storedRecommendation =
      JSON.parse(localStorage.getItem('recommendation')) || {};
    if (storedRecommendation) {
      loadPreviewData(storedRecommendation);
      plantSelect.value = storedRecommendation.name;
      soilOptions.forEach((option) => {
        if (option.value === storedRecommendation.soil) {
          // eslint-disable-next-line no-param-reassign
          option.checked = true;
        }
      });
      extrasCheckboxes.forEach((chk) => {
        if (storedRecommendation.extras.includes(chk.value)) {
          // eslint-disable-next-line no-param-reassign
          chk.checked = true;
        }
      });
    }

    customizeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      updatePreview();
    });
  }
});
