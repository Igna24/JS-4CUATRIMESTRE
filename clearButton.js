// clearButton.js
export default function handleClearButton(form, plantContainer) {
  const clearButton = document.getElementById('clearButton');

  clearButton.addEventListener('click', () => {
    form.reset();

    const container = plantContainer;
    container.innerHTML = '';
    container.style.display = 'none';

    localStorage.removeItem('recommendation');
  });
}
