async function loadContent() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const mediaGrid = document.getElementById('media-grid');

        if (!mediaGrid) {
            console.error('Media grid not found in HTML');
            return;
        }

        data.forEach(section => {
            section.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const title = document.createElement('h3');
                title.textContent = item.name;

                const playerContainer = document.createElement('div');
                playerContainer.className = 'card-media-container';

                if (section.category === 'videos') {
                    // Use Google Drive Preview for videos
                    const embedUrl = item.path.replace('/uc?export=download', '/preview');
                    const iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.className = 'card-media-iframe';
                    iframe.allow = 'autoplay';
                    playerContainer.appendChild(iframe);
                } else {
                    // For audio, we expect a direct stream link (e.g. Dropbox raw=1)
                    const audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = item.path;
                    audio.className = 'card-media-audio';
                    playerContainer.appendChild(audio);
                }

                card.appendChild(playerContainer);
                card.appendChild(title);
                mediaGrid.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);
