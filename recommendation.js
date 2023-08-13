function createImage(filename) {
  const img = document.createElement('img');
  img.src = `./assets/images/${filename}.png`;
  return img;
}

export default function recommendedPlant(recommendation, plantContainer) {
  const container = plantContainer;

  const storedRecommendation = JSON.parse(
    localStorage.getItem('recommendation'),
  );

  const imgPot = document.createElement('img');
  if (storedRecommendation) {
    const potStyle =
      storedRecommendation.potStyle === 'Decorated pot' ? 'decorated-' : '';
    const potColor = storedRecommendation.potColor.toLowerCase();
    const potMaterial = storedRecommendation.potMaterial.toLowerCase();
    imgPot.src = `./assets/images/pot-${potMaterial}-${potStyle}${potColor}.png`;
  } else {
    imgPot.src = `./assets/images/pot-${recommendation.pot.replace(
      ' pot',
      '',
    )}.png`;
  }

  const imgPlant = document.createElement('img');
  imgPlant.src = `./assets/images/plant-${recommendation.name}.png`;

  const imgSoil = document.createElement('img');
  imgSoil.src = `./assets/images/soil-${recommendation.soil.replace(
    ' Soil',
    '',
  )}.png`;

  const extrasContainer = document.createElement('div');
  extrasContainer.className = 'extras-container';

  recommendation.extras.forEach((extra) => {
    const extraImage = createImage(extra);
    extrasContainer.appendChild(extraImage);
  });

  container.innerHTML = '';
  container.appendChild(imgPot);
  container.appendChild(imgPlant);
  container.appendChild(imgSoil);
  container.appendChild(extrasContainer);

  const recommendationInfo = document.createElement('div');
  recommendationInfo.innerHTML = `
    <p>The perfect plant for you is...</p>
    <h3 class="plant-created-title">${recommendation.name}</h3>
    <div class="empty-container"></div>
    <div class="result-container">
      <div class="result-text-left">
        <p>Name</p>
        <p>Soil</p>
        <p>Pot</p>
        <p>Extras</p>
      </div>
      <div class="result-text-right">
        <p>${recommendation.name}</p>
        <p>${recommendation.soil}</p>
        <p>${recommendation.potColor}</p>
        <p>${recommendation.extras.join(', ')}</p>
      </div>  
    </div>
    <button id="customizeButton" class="customize-button">Customize</button>
  `;
  container.appendChild(recommendationInfo);

  const customizeButton = document.getElementById('customizeButton');
  customizeButton.addEventListener('click', () => {
    window.location.href = 'customize.html';
  });
  container.style.display = 'block';
}
