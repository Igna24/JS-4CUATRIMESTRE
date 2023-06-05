//conectando el API
export async function getJoke(url) {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error de red: ' + response.status);
    }
  }