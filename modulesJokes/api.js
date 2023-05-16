// Función para hacer una petición GET a la API
export function getJoke(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            // estado en 4 significa que la solicitud fue realizada y esta lista
            if (xhr.readyState === 4) {
                //estado 200 indica que la promesa se realizo con exito
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.send();
    });
}
