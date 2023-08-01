// clearButton.js
export default function handleClearButton(form, plantContainer) {
  const clearButton = document.getElementById("clearButton");

  clearButton.addEventListener("click", () => {
    form.reset();

    const container = plantContainer;
    container.innerHTML = "";
    container.style.display = "none";

    // Eliminar la recomendación guardada en el localStorage
    localStorage.removeItem("recommendation");
  });
}
