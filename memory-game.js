const board = document.getElementById('board');
    const modal = document.getElementById('winModal');
    const gridSize = 4;
    const images = ['https://raw.githubusercontent.com/NoToolsNoCraft/retail-puzzle-rotator/refs/heads/main/image1.webp', 
        'https://raw.githubusercontent.com/NoToolsNoCraft/retail-puzzle-rotator/refs/heads/main/image2.webp', 'https://raw.githubusercontent.com/NoToolsNoCraft/retail-puzzle-rotator/refs/heads/main/image3.webp'];
    let image = images[Math.floor(Math.random() * images.length)];
    let tiles = [];

    function createTile(row, col) {
      const tile = document.createElement('div');
      tile.className = 'tile';

      const inner = document.createElement('div');
      inner.className = 'tile-inner';
      inner.style.backgroundImage = `url('${image}')`;

      const xPercent = col * 100 / (gridSize - 1);
      const yPercent = row * 100 / (gridSize - 1);
      inner.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

      const rotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
      inner.style.transform = `rotate(${rotation}deg)`;
      inner.dataset.rotation = rotation;

      tile.appendChild(inner);
      tile.addEventListener('click', () => {
        const current = parseInt(inner.dataset.rotation);
        const newRotation = (current + 90) % 360;
        inner.dataset.rotation = newRotation;
        inner.style.transform = `rotate(${newRotation}deg)`;
        checkWin();
      });

      return tile;
    }

    function initGame() {
      image = images[Math.floor(Math.random() * images.length)];
      board.innerHTML = '';
      tiles = [];
      closeModal();

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const tile = createTile(r, c);
          board.appendChild(tile);
          tiles.push(tile);
        }
      }
    }

    function checkWin() {
      const isSolved = tiles.every(tile => {
        const inner = tile.firstChild;
        return parseInt(inner.dataset.rotation) === 0;
      });
      if (isSolved) {
        setTimeout(() => {
          updateShareLinks();
          openModal();
        }, 300);
      }
    }

    function openModal() {
      modal.style.display = 'flex';
    }

    function closeModal() {
      modal.style.display = 'none';
    }

    function updateShareLinks() {
      const gameUrl = window.location.href;
      const message = encodeURIComponent("I just completed the puzzle! Try it too 👉 " + gameUrl);

      document.getElementById('share-facebook').href =
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`;

      document.getElementById('share-whatsapp').href =
        `https://api.whatsapp.com/send?text=${message}`;

      document.getElementById('share-viber').href =
        `viber://forward?text=${message}`;

      document.getElementById('share-telegram').href =
        `https://t.me/share/url?url=${encodeURIComponent(gameUrl)}&text=${message}`;
    }

    window.addEventListener('load', updateShareLinks);
    initGame();