async function loadContent() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const mediaGrid = document.getElementById('media-grid');
        if (!mediaGrid) return;
        mediaGrid.innerHTML = '';

        // 1. Hero Section (Binary Legends)
        const heroSection = document.createElement('div');
        heroSection.className = 'hero-section';
        heroSection.innerHTML = `
            <div class="hero-container">
                <h2>♂ MAIN FEATURE ♂</h2>
                <div class="hero-video">
                    <video src="assets/videos/video_bg.mp4" autoplay loop muted playsinline></video>
                </div>
                <div class="hero-legends">
                    <div class="hero-legend">
                        <img src="https://i.imgur.com/XvD8Xz6.jpg" alt="Billy Herrington" class="legend-img">
                        <span>BILLY HERRINGTON</span>
                    </div>
                    <div class="hero-legend">
                        <img src="https://i.imgur.com/v6fPZzW.jpg" alt="Van Darkholme" class="legend-img">
                        <span>VAN DARKHOLME</span>
                    </div>
                </div>
            </div>
        `;
        mediaGrid.appendChild(heroSection);

        // 2. Channel Portal Section (Now the main hub for videos)
        const channels = [
            { name: 'TOPWP', url: 'https://www.youtube.com/@TOPWP/videos' },
            { name: 'datezrealboi', url: 'https://www.youtube.com/@datezrealboi' },
            { name: 'akasanGachi', url: 'https://www.youtube.com/@akasanGachi' },
            { name: 'tabolichgachi', url: 'https://www.youtube.com/@tabolichgachi' },
            { name: 'MYASSTRO300', url: 'https://www.youtube.com/@MYASSTRO300' },
            { name: 'CrazyFrogGachi', url: 'https://www.youtube.com/@CrazyFrogGachi' },
            { name: 'djmisha9826', url: 'https://www.youtube.com/@djmisha9826/videos' },
            { name: 'KuK-Videos', url: 'https://www.youtube.com/@KuK-Videos' },
            { name: 'daffyso2297', url: 'https://www.youtube.com/@daffyso2297' },
            { name: 'Sexton', url: 'https://www.youtube.com/channel/UCBwYv5EB7017oBA3RAM4wgw' },
        ];

        const chHeader = document.createElement('h2');
        chHeader.className = 'grid-header';
        chHeader.textContent = '♂ Gachi Channel Portal ♂';
        mediaGrid.appendChild(chHeader);

        channels.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'card channel-card';

            let mediaContent = '';
            if (ch.name === 'Sexton') {
                mediaContent = `
                    <div class="card-media-container">
                        <iframe class="card-media-iframe" src="https://www.youtube.com/embed/IXFjJGZlzEE"
                            allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                `;
            }

            card.innerHTML = `
                ${mediaContent}
                <div class="channel-info">
                    <h3">${ch.name}</h3>
                    <a href="${ch.url}" target="_blank" class="channel-btn">VISIT CHANNEL ♂</a>
                </div>
            `;
            mediaGrid.appendChild(card);
        });

        // 3. Audio Section
        const audioSection = data.find(s => s.category === 'tracks');
        if (audioSection) {
            const aHeader = document.createElement('h2');
            aHeader.className = 'grid-header';
            aHeader.textContent = '♂ Legendary Tracks ♂';
            mediaGrid.appendChild(aHeader);

            audioSection.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                const playerContainer = document.createElement('div');
                playerContainer.className = 'card-media-container';
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = item.path;
                audio.className = 'card-media-audio';
                playerContainer.appendChild(audio);
                const title = document.createElement('h3');
                title.textContent = item.name;
                card.appendChild(playerContainer);
                card.appendChild(title);
                mediaGrid.appendChild(card);
            });
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadContent);
