document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchMusic(query);
});

document.getElementById('toggle-mode').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});

async function searchMusic(query) {
    const apiKey = '8bc8519713msh3b7f1f084f423c3p11673bjsnf7e098a89977'; // Your RapidAPI key
    const url = `https://spotify81.p.rapidapi.com/download_track_sc?q=${encodeURIComponent(query)}&onlyLinks=true`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'spotify81.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const results = data.tracks.map(track => ({
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            imageUrl: track.album.images[0].url,
            downloadUrl: track.external_urls.spotify // This is a placeholder, actual download URL might differ
        }));
        displayResults(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const img = document.createElement('img');
        img.src = result.imageUrl;
        resultItem.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = `${result.title} - ${result.artist}`;
        resultItem.appendChild(title);

        const downloadButton = document.createElement('a');
        downloadButton.href = result.downloadUrl;
        downloadButton.className = 'download-button';
        downloadButton.textContent = 'Download';
        resultItem.appendChild(downloadButton);

        resultsContainer.appendChild(resultItem);
    });
}
