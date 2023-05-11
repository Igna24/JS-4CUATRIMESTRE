// buttons.js
import { getJoke } from './api.js';
import { displayJoke, clearJokes } from '../JavaScriptJokes/main.js';

export function setupButtons() {
    document.querySelector('#random-joke').addEventListener('click', function () {
        clearJokes();
        getJoke('https://icanhazdadjoke.com/')
            .then(response => displayJoke(response.joke))
            .catch(error => console.log(error));
    });

    document.querySelector('#search-joke').addEventListener('click', function () {
        clearJokes();
        const searchQuery = document.querySelector('#search').value;
        if (searchQuery) {
            getJoke('https://icanhazdadjoke.com/search?term=' + searchQuery)
                .then(response => {
                    if (response.results.length > 0) {
                        response.results.forEach(result => displayJoke(result.joke));
                    } else {
                        displayJoke('No hubo resultados');
                    }
                })
                .catch(error => console.log(error));
        }
    });
}
