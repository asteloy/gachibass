async function loadContent() {
    try {
        const response = await fetch('content.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const mediaGrid = document.getElementById('media-grid');
        if (!mediaGrid) return;
        mediaGrid.innerHTML = '';

        // 1. Hero Section (Legends of Gachi)
        const legendsSection = data.find(s => s.category === 'legends');
        if (legendsSection) {
            const heroSection = document.createElement('div');
            heroSection.className = 'hero-section';
            heroSection.innerHTML = `
                <div class="hero-container">
                    <div class="hero-video">
                        <video src="assets/videos/video_bg.mp4" autoplay loop muted playsinline></video>
                    </div>
                    <div class="hero-legends" style="flex-wrap: wrap; gap: 20px;">
                        ${legendsSection.items.map(l => `
                            <div class="hero-legend" style="cursor: pointer;" onclick="showHeroDescription('${l.name}')">
                                <img src="${l.img}" alt="${l.name}" class="legend-img">
                                <span>${l.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            mediaGrid.appendChild(heroSection);
        }

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
                audio.preload = 'none';
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

function showNotification(text) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    // Clear existing notifications to avoid clutter
    container.innerHTML = '';

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = text;
    container.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('hero-modal');
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    const radioBtn = document.getElementById('radio-btn');
    const radioPlayer = document.getElementById('radio-player');

    if (radioBtn && radioPlayer) {
        let loadTimeout;

        radioBtn.addEventListener('click', () => {
            if (radioPlayer.paused || radioPlayer.ended) {
                radioBtn.textContent = 'LOADING... ♂';
                radioBtn.disabled = true;

                radioPlayer.src = `https://radio.gachibass.us.to/fisting?t=${Date.now()}`;
                radioPlayer.load();

                loadTimeout = setTimeout(() => {
                    console.warn('Radio stream took too long to start. Resetting...');
                    radioPlayer.pause();
                    radioPlayer.src = '';
                    radioPlayer.load();
                    radioBtn.textContent = 'PLAY RADIO ♂';
                    radioBtn.disabled = false;
                    showNotification('♂♂♂ Радио не удалось загрузить ♂♂♂<br>Попробуйте открыть поток напрямую: <a href="https://radio.gachibass.us.to/fisting" target="_blank" style="color: #fff; text-decoration: underline;">прямая ссылка ♂</a> или <a href="https://www.youtube.com/watch?v=RmKYIxYfwpc" target="_blank" style="color: #fff; text-decoration: underline;">YouTube ♂</a>, REAL MAN!');
                }, 8000);

                radioPlayer.play()
                    .then(() => {
                        // state changes to 'playing' inside event listener
                    })
                    .catch(e => {
                        console.error('Radio playback failed:', e);
                        clearTimeout(loadTimeout);
                        radioBtn.textContent = 'PLAY RADIO ♂';
                        radioBtn.disabled = false;
                        showNotification('♂♂♂ Ошибка при запуске радио ♂♂♂<br>Попробуйте открыть поток напрямую: <a href="https://radio.gachibass.us.to/fisting" target="_blank" style="color: #fff; text-decoration: underline;">прямая ссылка ♂</a> или <a href="https://www.youtube.com/watch?v=RmKYIxYfwpc" target="_blank" style="color: #fff; text-decoration: underline;">YouTube ♂</a>, REAL MAN!');
                    });
            } else {
                radioPlayer.pause();
                radioPlayer.src = '';
                radioPlayer.load();
                radioBtn.textContent = 'PLAY RADIO ♂';
                radioBtn.classList.remove('playing');
            }
        });

        radioPlayer.addEventListener('playing', () => {
            clearTimeout(loadTimeout);
            radioBtn.textContent = 'STOP RADIO ♂';
            radioBtn.disabled = false;
            radioBtn.classList.add('playing');
            stopAllAudio(radioPlayer);
        });
    }
    loadContent();
});
