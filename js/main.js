async function loadContent() {
    try {
        const data = GACHI_DATA;

        const videoGrid = document.getElementById('video-grid');
        const audioGrid = document.getElementById('audio-grid');

        data.forEach(section => {
            const grid = section.category === 'videos' ? videoGrid : audioGrid;

            section.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const title = document.createElement('h3');
                title.textContent = item.name;

                const btn = document.createElement('button');
                btn.className = 'play-btn';
                btn.textContent = section.category === 'videos' ? 'Смотреть ♂' : 'Слушать ♂';

                btn.onclick = () => {
                    const filePath = item.path.replace(/\\/g, '/');
                    const fullLocalPath = filePath.startsWith('file:///') ? filePath : `file:///${filePath}`;

                    if (section.category === 'videos') {
                        openPlayer(fullLocalPath, item.name, 'video');
                    } else {
                        openPlayer(fullLocalPath, item.name, 'audio');
                    }
                };

                card.appendChild(title);
                card.appendChild(btn);
                grid.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function openPlayer(path, title, type) {
    const modal = document.getElementById('player-modal');
    const container = document.getElementById('player-container');
    const titleEl = document.getElementById('player-title');

    titleEl.textContent = title;
    container.innerHTML = '';

    let mediaElement;
    if (type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        mediaElement.autoplay = true;
    } else {
        mediaElement = document.createElement('audio');
        mediaElement.controls = true;
        mediaElement.autoplay = true;
    }

    mediaElement.src = path;
    container.appendChild(mediaElement);
    modal.style.display = 'block';

    // Handle error if file not found
    mediaElement.onerror = () => {
        container.innerHTML = `<<pp style="color: #ff4444; padding: 20px;">Ошибка: Файл не найден или доступ заблокирован браузером.<<brbr>Попробуйте открыть сайт через index.html прямо из папки.</p>`;
    };
}

// Close modal
document.querySelector('.close-btn').onclick = () => {
    const modal = document.getElementById('player-modal');
    modal.style.display = 'none';
    document.getElementById('player-container').innerHTML = '';
};

// Close modal on outside click
window.onclick = (event) => {
    const modal = document.getElementById('player-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('player-container').innerHTML = '';
    }
};

document.addEventListener('DOMContentLoaded', loadContent);
