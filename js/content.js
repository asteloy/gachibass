async function loadContent() {
    try {
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

                const title = document.createElement('h3');
                title.textContent = item.name;

                const playerContainer = document.createElement('div');
                playerContainer.className = 'card-media-container';

                // For Google Drive, the uc?export=download links often trigger downloads in
                // standard <video>/<audio> tags. We will use an iframe for a better experience.
                const embedUrl = item.path.replace('/uc?export=download', '/preview');

                if (section.category === 'videos') {
                    const iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.className = 'card-media-iframe';
                    iframe.allow = 'autoplay';
                    playerContainer.appendChild(iframe);
                } else {
                    const audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = item.path;
                    audio.className = 'card-media-audio';
                    playerContainer.appendChild(audio);
                }

                card.appendChild(playerContainer);
                card.appendChild(title);
                grid.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);
