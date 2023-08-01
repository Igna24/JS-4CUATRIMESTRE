import recommendedPlant from "./recommendation.js";

function showError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
}

function hideError() {
  const errorContainer = document.getElementById("error-container");
  errorContainer.style.display = "none";
}

function loadPreviewImages(data) {
  const plantPreviewImage = document.getElementById("plantPreviewImage");
  plantPreviewImage.innerHTML = "";

  const potImage = document.createElement("img");
  potImage.src = `./assets/images/pot-${data.pot.replace(" pot", "")}.png`;
  plantPreviewImage.appendChild(potImage);

  const plantImage = document.createElement("img");
  plantImage.src = `./assets/images/${data.plantImage}.png`;
  plantPreviewImage.appendChild(plantImage);

  const soilImage = document.createElement("img");
  soilImage.src = `./assets/images/soil-${data.soil.replace(" Soil", "")}.png`;
  plantPreviewImage.appendChild(soilImage);

  data.extras.forEach((extra) => {
    const extraImage = document.createElement("img");
    extraImage.src = `./assets/images/${extra}.png`;
    plantPreviewImage.appendChild(extraImage);
  });
}

function loadPreviewData(data) {
  document.getElementById("previewPlantName").textContent = data.name;
  document.getElementById("previewSoil").textContent = data.soil;
  document.getElementById("previewPot").textContent = data.pot;
  document.getElementById("previewPotColor").textContent = data.potColor;
  document.getElementById("previewExtras").textContent = Array.isArray(
    data.extras,
  )
    ? data.extras.join(", ")
    : "";

  // Load the preview images into the customize form
  loadPreviewImages(data);
}

document.addEventListener("DOMContentLoaded", () => {
  const customizeForm = document.getElementById("customizeForm");

  // Load the preview data from localStorage if available
  const storedRecommendation = JSON.parse(
    localStorage.getItem("recommendation"),
  );
  if (storedRecommendation) {
    loadPreviewData(storedRecommendation);
  }

  // Handle the form submission
  customizeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(customizeForm);

    const place = formData.get("place");
    const sunlight = formData.get("sunlight");
    const pets = formData.get("pets");
    const water = formData.get("water");
    const style = formData.get("style");
    const extras = formData.getAll("extras");

    if (place && sunlight && pets && water && style) {
      const recommendation = {
        name: "",
        soil: "",
        pot: "",
        potColor: "",
        potMaterial: "",
        potStyle: "",
        extras,
      };

      // Set recommendation properties based on form data
      if (place === "inside_indirect") {
        recommendation.name = "Sansevieria";
        recommendation.plantImage = "plant-sansevieria";
      } else if (place === "inside_lot") {
        recommendation.name = "Aglaonema";
        recommendation.plantImage = "plant-aglaonema";
      } else if (place === "outside") {
        recommendation.name = "Aloe Vera";
        recommendation.plantImage = "plant-aloe";
      }

      recommendation.soil =
        sunlight === "yes" ? "Composted Soil" : "Fertilized Soil";

      recommendation.pot = pets === "yes" ? "Ceramic pot" : "Clay pot";
      if (pets === "yes") {
        recommendation.potStyle =
          "Substitute the soil for the easy drainage soil";
      }

      recommendation.potMaterial =
        water === "overwater" ? "Clay pot" : "Ceramic pot";

      if (style === "minimalism") {
        recommendation.potStyle = "Simple pot";
      } else if (style === "decoration") {
        recommendation.potStyle = "Simple pot decorated";
      } else if (style === "bright_colors") {
        recommendation.potStyle = "Painted pot decorated";
      }

      // Get the selected plant from the "plantSelect" dropdown
      const plantSelect = formData.get("plant");
      recommendation.plantImage = `plant-${plantSelect
        .toLowerCase()
        .replace(" ", "-")}`;

      // Get the selected pot color from the "potColor" radio buttons
      const potColor = formData.get("potColor");
      recommendation.potColor = potColor || "No color"; // Set a default value if no pot color is selected

      recommendedPlant(
        recommendation,
        document.getElementById("plant-preview"),
      );
      loadPreviewImages(recommendation);
      localStorage.setItem("recommendation", JSON.stringify(recommendation));
    } else {
      showError("Please check all boxes");
    }
  });

  // Hide the error message when the user interacts with the form again
  customizeForm.addEventListener("change", () => {
    hideError();
  });
});
