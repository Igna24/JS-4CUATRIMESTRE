export default function handleClearButton(form, container) {
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", () => {
    form.reset();
    const containerStyle = container.style;
    containerStyle.display = "none";
  });
}
