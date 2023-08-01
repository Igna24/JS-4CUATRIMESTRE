// index.js
import initializeForm from "./form.js";
import recommendedPlant from "./recommendation.js";

// Inicializar el formulario
initializeForm();

// Obtener el botón "Customize"
const customizeButton = document.getElementById("customizeButton");

// Redireccionar al usuario a la página de customización (customize.html) con los datos del localStorage en la URL
customizeButton.addEventListener("click", () => {
  const storedRecommendation =
    JSON.parse(localStorage.getItem("recommendation")) || recommendedPlant;
  const queryParams = new URLSearchParams(storedRecommendation);
  window.location.href = `customize.html?${queryParams.toString()}`;
});
