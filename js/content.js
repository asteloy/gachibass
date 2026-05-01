async function loadContent() {
    try {
        // Fetch the data from the JSON file
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const videoGrid = document.getElementById('video-grid');
        const audioGrid = document.getElementById('audio-grid');

        if (!videoGrid || !audioGrid) {
            console.error('Grids not found in HTML');
            return;
        }

        data.forEach(section => {
            const grid = section.category === 'videos' ? videoGrid : audioGrid;

            section.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const mediaElement = document.createElement(section.category === 'videos' ? 'video' : 'audio');
                mediaElement.controls = true;
                mediaElement.src = item.path;
                mediaElement.className = 'card-media';

                if (section.category === 'videos') {
                    mediaElement.preload = 'metadata';
                }

                const title = document.createElement('h3');
                title.textContent = item.name;

                card.appendChild(mediaElement);
                card.appendChild(title);
                grid.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);
