
const imagenPrincipal = document.getElementById('imagenPrincipal');
const imagenesMuestra = document.getElementById('imagenesMuestra');
const botonCambiar = document.getElementById('botonCambiar');

let categoriaActual = 'negra';

fetch('./modulesJokes/apiData.json')
  .then(response => response.json())
  .then(data => {
    mostrarCategoria('negra');

    data.forEach(imagen => {
      const categoria = obtenerCategoria(imagen.name.toLowerCase());
      if (categoria && categoria !== categoriaActual) {
        const img = document.createElement('img');
        img.src = imagen.gallery;
        img.alt = imagen.name;
        img.classList.add('imagen');
        img.addEventListener('click', () => {
          mostrarCategoria(categoria);
        });

        imagenesMuestra.appendChild(img);
      }
    });

    botonCambiar.addEventListener('click', () => {
      if (categoriaActual === 'negra') {
        mostrarCategoria('blanca');
      } else {
        mostrarCategoria('negra');
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
  });

function mostrarCategoria(categoria) {
  categoriaActual = categoria;
  const imagen = document.querySelector(`img[alt*="${categoria}"]`);
  imagenPrincipal.innerHTML = '';
  imagenPrincipal.appendChild(imagen.cloneNode(true));
}

function obtenerCategoria(nombre) {
  if (nombre.includes('negra')) {
    return 'negra';
  } else if (nombre.includes('blanca')) {
    return 'blanca';
  }
  return null;
}
