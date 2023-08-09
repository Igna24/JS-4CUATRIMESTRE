document.addEventListener("DOMContentLoaded", () => {
  const orderNameElement = document.getElementById("orderName");
  const orderSoilElement = document.getElementById("orderSoil");
  const orderPotElement = document.getElementById("orderPot");
  const orderPotMaterialElement = document.getElementById("orderPotMaterial");
  const orderPotStyleElement = document.getElementById("orderPotStyle");
  const orderExtrasElement = document.getElementById("orderExtras");
  const orderImagesContainer = document.getElementById("orderImages");

  // Obtener los detalles de la orden almacenados en localStorage
  const storedOrder = JSON.parse(localStorage.getItem("recommendation"));

  if (storedOrder) {
    orderNameElement.textContent = storedOrder.name;
    orderSoilElement.textContent = storedOrder.soil;
    orderPotElement.textContent = storedOrder.pot;
    orderPotMaterialElement.textContent = storedOrder.potMaterial;
    orderPotStyleElement.textContent = storedOrder.potStyle;
    orderExtrasElement.textContent = storedOrder.extras.join(", ");

    // Mostrar las imágenes relacionadas con la orden
    const images = [
      `./assets/images/pot-${storedOrder.pot.replace(" pot", "")}.png`,
      `./assets/images/plant-${storedOrder.name}.png`,
      `./assets/images/soil-${storedOrder.soil.replace(" Soil", "")}.png`,
    ];

    storedOrder.extras.forEach((extra) => {
      images.push(`./assets/images/${extra}.png`);
    });

    images.forEach((imageSrc) => {
      const imageElement = document.createElement("img");
      imageElement.src = imageSrc;
      orderImagesContainer.appendChild(imageElement);
    });
  }
});
