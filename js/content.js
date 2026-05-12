async function loadContent() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const mediaGrid = document.getElementById('media-grid');
        if (!mediaGrid) return;
        mediaGrid.innerHTML = '';

        // 1. Hero Section (Legends of Gachi)
        const legends = [
            { name: 'BILLY HERRINGTON', img: 'assets/pictures/BILLY HERRINGTON.webp' },
            { name: 'VAN DARKHOLME', img: 'assets/pictures/VAN DARKHOLME.jpg' },
            { name: 'RICARDO MILOS', img: 'assets/pictures/RICARDO MILOS.jpg' },
            { name: 'BRAD MCGAIRE', img: 'assets/pictures/BRAD MCGAIRE.jpg' },
            { name: 'DANNY LEE', img: 'assets/pictures/DANNY LEE.jpg' },
            { name: 'MARK WOLF', img: 'assets/pictures/MARK WOLF.jpg' },
            { name: 'RAY HARLEY', img: 'assets/pictures/RAY HARLEY.jpg' },
            { name: 'STEVE HERLEY', img: 'assets/pictures/STEVE HERLEY.jpg' },
            { name: 'STEVE REMBO', img: 'assets/pictures/STEVE REMBO.jpg' },
        ];

        const heroSection = document.createElement('div');
        heroSection.className = 'hero-section';
        heroSection.innerHTML = `
            <div class="hero-container">
                <div class="hero-video">
                    <video src="assets/videos/video_bg.mp4" autoplay loop muted playsinline></video>
                </div>
                <div class="hero-legends" style="flex-wrap: wrap; gap: 20px;">
                    ${legends.map(l => `
                        <div class="hero-legend" style="cursor: pointer;" onclick="showHeroDescription('${l.name}')">
                            <img src="${l.img}" alt="${l.name}" class="legend-img">
                            <span>${l.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        mediaGrid.appendChild(heroSection);

        // 2. Channel Portal Section
        const channels = [
            { name: 'TOPWP', url: 'https://www.youtube.com/@TOPWP/videos' },
            { name: 'datezrealboi', url: 'https://www.youtube.com/@datezrealboi' },
            { name: 'akasanGachi', url: 'https://www.youtube.com/@akasanGachi' },
            { name: 'tabolichgachi', url: 'https://www.youtube.com/@tabolichgachi', videoId: '29HLU7P_ZIA' },
            { name: 'MYASSTRO300', url: 'https://www.youtube.com/@MYASSTRO300', videoId: 'KwbrV7nN8y0' },
            { name: 'CrazyFrogGachi', url: 'https://www.youtube.com/@CrazyFrogGachi', videoId: 'hlDHk4eIKFo' },
            { name: 'djmisha9826', url: 'https://www.youtube.com/@djmisha9826/videos', videoId: '-NPD--V_h84' },
            { name: 'KuK-Videos', url: 'https://www.youtube.com/@KuK-Videos', videoId: 'C5fKF5aVa7E' },
            { name: 'daffyso2297', url: 'https://www.youtube.com/@daffyso2297', videoId: 'Goa_6Zhlutc' },
            { name: 'DRAMERSON', url: 'https://www.youtube.com/channel/UCBwYv5EB7017oBA3RAM4wgw', videoId: 'IXFjJGZlzEE' },
        ];

        const chHeader = document.createElement('h2');
        chHeader.className = 'grid-header';
        chHeader.textContent = '♂ Gachi Channel Portal ♂';
        mediaGrid.appendChild(chHeader);

        channels.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'card channel-card';

            let mediaContent = '';
            if (ch.name === 'DRAMERSON') {
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
            aHeader.textContent = 'Главный ♂REAL MAN♂ Российской Федерации ♂Swallowsher MorGaySlave♂ представляет';
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
                audio.onplay = () => {
                    stopAllAudio(audio);
                };
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

function stopAllAudio(except) {
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(a => {
        if (a !== except) {
            a.pause();
            a.currentTime = 0;
        }
    });
}

async function showHeroDescription(name) {
    const modal = document.getElementById('hero-modal');
    const title = document.getElementById('player-title');
    const description = document.getElementById('hero-description');

    title.textContent = name;
    description.textContent = 'Загрузка описания...';
    modal.style.display = 'block';

    try {
        const response = await fetch(`assets/description/${name}.txt`);
        if (!response.ok) throw new Error('Description not found');
        const text = await response.text();
        description.textContent = text;
    } catch (error) {
        description.textContent = 'Описание отсутствует или не может быть загружено.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('hero-modal');
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    const radioPlayer = document.getElementById('radio-player');
    if (radioPlayer) {
        radioPlayer.src = 'https://radio.gachibass.us.to/fisting';
        radioPlayer.onplay = () => {
            stopAllAudio(radioPlayer);
        };
    }
    loadContent();
});
