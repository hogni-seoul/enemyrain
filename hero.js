class Hero {
  constructor(gameAreaElement) {
    this.gameAreaElement = gameAreaElement;
    this.heroElement = this.spawn();
    this.rightPressed = false;
    this.leftPressed = false;

    // 키 세팅
    this.setControler();
  }

  spawn() {
    const heroElement = document.createElement('div');
    heroElement.classList.add('hero');
    this.gameAreaElement.appendChild(heroElement);

    this.horizontalRange = [
      0,
      this.gameAreaElement.offsetWidth - heroElement.offsetWidth,
    ];

    heroElement.style.left = this.horizontalRange[1] / 2 + 'px';

    return heroElement;
  }

  setControler() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          this.leftPressed = true;
          this.heroElement.classList.add('left');
          break;
        case 'Right':
        case 'ArrowRight':
          this.rightPressed = true;
          this.heroElement.classList.add('right');
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          this.leftPressed = false;
          this.heroElement.classList.remove('left');
          break;
        case 'Right':
        case 'ArrowRight':
          this.rightPressed = false;
          this.heroElement.classList.remove('right');
          break;
      }
    });

    setInterval(() => this.move(), 1);
  }

  move() {
    let currentLeft = parseInt(this.heroElement.style.left);
    if (this.leftPressed && currentLeft > this.horizontalRange[0]) {
      currentLeft--;
      this.heroElement.style.left = currentLeft + 'px';
    } else if (this.rightPressed && currentLeft < this.horizontalRange[1]) {
      currentLeft++;
      this.heroElement.style.left = currentLeft + 'px';
    }
  }
}
