// Crea un nuevo objeto URLSearchParams a partir de la cadena de consulta en la URL actual
const urlParams = new URLSearchParams(window.location.search);

//Extrae el valor del parámetro llamado 'joke' de los parámetros de la URL si no hya nada dara NULL
const jokeParam = urlParams.get('joke');

//Decodifica el valor del parámetro joke utilizando la función ya que seria el contrario del que usamos en main.js linea 11
const decodedJoke = decodeURIComponent(jokeParam);

//agregamos el contenido al p
const jokeElement = document.getElementById('main-joke');
jokeElement.textContent = decodedJoke;
