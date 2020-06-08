class GameController {
  constructor() {
    if (GameController.exists) {
      return GameController.instance;
    }

    const startButton = document.querySelector('.btn');
    startButton.addEventListener('click', () => {
      if (this.isStarted) return;
      this.init(200);
      this.isStarted = true;
    });

    this.isStarted = false;
    // 하나의 인스턴스만 존재할 수 있음. 인스턴스가 이미 존재하면 기존 인스턴스에 대한 참조 반환
    GameController.instance = this;
    GameController.exists = true;
  }

  init(enemeyTotal) {
    this.gameAreaElement = document.querySelector('#bg');

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-container');
    scoreContainer.textContent = 'Score: ';

    this.scoreElement = document.createElement('span');
    this.scoreElement.classList.add('score');
    this.scoreElement.textContent = '0';

    const hpContainer = document.createElement('div');
    hpContainer.classList.add('hp-container');
    hpContainer.innerHTML =
      '<i class="fas fa-heart"></i><i class="fas fa-heart"></i><i class="fas fa-heart"></i>';

    scoreContainer.appendChild(this.scoreElement);
    this.gameAreaElement.appendChild(scoreContainer);
    this.gameAreaElement.appendChild(hpContainer);

    this.audio = new Audio('./audio/dying.wav');
    this.audio.playbackRate = 3;

    this.score = 0;
    this.hp = 3;

    const hero = new Hero(this.gameAreaElement);

    for (let i = 0; i < enemeyTotal; i++) {
      let intervalTime = Math.floor(Math.random() * 800 + 200) + i * 1000;
      setTimeout(() => {
        new Enemy(this.gameAreaElement, hero, this);
      }, intervalTime);
    }
  }

  reset() {
    this.gameAreaElement.innerHTML = '';
    this.init();
  }

  addScore() {
    this.score += 1;
    this.scoreElement.textContent = this.score.toString();
  }

  minusHp() {
    const hpIcons = document.querySelector('.hp-container');
    hpIcons.innerHTML = hpIcons.innerHTML.replace(
      '<i class="fas fa-heart"></i>',
      ''
    );
    this.hp -= 1;
    if (this.hp <= 0) {
      setTimeout(() => {
        this.gameOver();
      }, 300);
    }
  }

  gameOver() {
    alert('Game Over');
    window.location = '/';
  }
}

new GameController();
