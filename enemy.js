class Enemy {
  constructor(gameAreaElement, Hero, GameController) {
    this.gameAreaElement = gameAreaElement;
    this.heroElement = Hero.heroElement;
    this.GameController = GameController;
    this.enemyElement = this.spawn();

    this.dropEnemy(
      this.enemyElement,
      this.horizontalMaxRange,
      this.verticalMaxRange,
      10
    );
  }

  spawn() {
    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');
    this.gameAreaElement.appendChild(enemyElement);

    this.horizontalMaxRange =
      this.gameAreaElement.offsetWidth - enemyElement.offsetWidth;
    this.verticalMaxRange = this.gameAreaElement.offsetHeight;

    return enemyElement;
  }

  dropEnemy(enemyElement, horizontalMaxRange, verticalMaxRange, speed) {
    let currentTop = 0;
    enemyElement.style.left =
      Math.floor(Math.random() * horizontalMaxRange) + 1 + 'px';
    const interval = setInterval(() => {
      if (verticalMaxRange === currentTop) {
        clearInterval(interval);
        enemyElement.remove();
        // 바닥까지 닿으면 hp 감소.
        this.GameController.minusHp();
      } else {
        currentTop++;
        enemyElement.style.top = currentTop + 'px';
        // hero와 부딪히면 사라진다.
        if (this.collide(this.enemyElement, this.heroElement, 20)) {
          clearInterval(interval);
          this.killed(enemyElement);
          this.GameController.addScore();
        }
      }
    }, speed);
  }

  collide(enemyElement, heroElement, radius) {
    const horizontalPosDiff = Math.abs(
      enemyElement.offsetLeft +
        enemyElement.offsetWidth / 2 -
        (heroElement.offsetLeft + heroElement.offsetWidth / 2)
    );
    const verticalPosDiff = Math.abs(
      enemyElement.offsetTop +
        enemyElement.offsetHeight / 2 -
        (heroElement.offsetTop + heroElement.offsetHeight / 2)
    );
    return horizontalPosDiff < radius && verticalPosDiff < radius;
  }

  killed(enemyElement) {
    enemyElement.classList.add('dead');
    this.GameController.audio.play();
    setTimeout(() => enemyElement.remove(), 1000);
  }
}
