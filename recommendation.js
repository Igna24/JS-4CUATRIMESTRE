export default function recomendedPlant(recommendation, plantContainer) {
  const imgPot = document.createElement("img");
  imgPot.src = `./assets/images/pot-${recommendation.pot.replace(
    " pot",
    "",
  )}.png`;

  const imgPlant = document.createElement("img");
  imgPlant.src = `./assets/images/plant-${recommendation.name}.png`;

  const imgSoil = document.createElement("img");
  imgSoil.src = `./assets/images/soil-${recommendation.soil.replace(
    " Soil",
    "",
  )}.png`;

  recommendation.extras.forEach((extra) => {
    const extraImage = document.createElement("img");
    extraImage.src = `./assets/images/${extra}.png`;
    plantContainer.appendChild(extraImage);
  });

  // eslint-disable-next-line no-param-reassign
  plantContainer.innerHTML = "";
  plantContainer.appendChild(imgPot);
  plantContainer.appendChild(imgPlant);
  plantContainer.appendChild(imgSoil);

  const recommendationInfo = document.createElement("div");
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
      <p>${recommendation.pot}</p>
      <p>${recommendation.extras.join(", ")}</p>
    </div>  
  </div>
  `;
  plantContainer.appendChild(recommendationInfo);
  // eslint-disable-next-line no-param-reassign
  plantContainer.style.display = "block";
}
