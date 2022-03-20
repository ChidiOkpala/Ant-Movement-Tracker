class MoveAnt {
  constructor(initPosition) {
    this.antsTouchedPosition = [];
    this.initPosition = initPosition;
    this.createGridTiles();
    this.moveAnt(initPosition);
    this.resetButton = document.getElementById('btn-reset');
    this.resetRandomButton = document.getElementById('btn-reset-random');
    this.resetButton.addEventListener('click', () => this.reset());
    this.resetRandomButton.addEventListener('click', () => this.resetRandom());
  }

  reset() {
    this.destroyGridTiles();

    this.antsTouchedPosition = [];
    this.createGridTiles();
    this.moveAnt(this.initPosition);
  }

  resetRandom() {
    this.destroyGridTiles();
    const randomPosition = Math.floor(Math.random() * 99);

    this.antsTouchedPosition = [];
    this.createGridTiles();
    this.moveAnt(randomPosition);
  }

  destroyGridTiles() {
    const gridContainer = document.getElementById('grid-container');

    while (gridContainer.lastChild) {
      gridContainer.removeChild(gridContainer.lastChild);
    }
  }

  checkTopLimit(number) {
    return number <= 9;
  }

  checkBottomLimit(number) {
    return number >= 90;
  }

  checkLeftLimit(number) {
    return number % 10 == 0
  }

  checkRightLimit(number) {
    return number % 10 == 9
  }

  createGridTiles() {
    const gridContainer = document.getElementById('grid-container');

    for (let i = 0; i < 100; i++) {
      const antTile = document.createElement('div');
  
      antTile.classList.add('ant-tile');
      antTile.setAttribute('id', i)
  
      gridContainer.append(antTile);
    }
  }

  getAntsInstancePossibleDirection(currentPosition) {
    if (this.checkTopLimit(currentPosition) && this.checkLeftLimit(currentPosition)) {
      return [currentPosition + 1, currentPosition + 10]
    }
    else if (this.checkTopLimit(currentPosition) && this.checkRightLimit(currentPosition)) {
      return [currentPosition - 1, currentPosition + 10]
    }
    else if (this.checkBottomLimit(currentPosition) && this.checkLeftLimit(currentPosition)) {
      return [currentPosition + 1, currentPosition - 10]
    }
    else if (this.checkBottomLimit(currentPosition) && this.checkRightLimit(currentPosition)) {
      return [currentPosition - 1, currentPosition - 10]
    }
    else if (this.checkTopLimit(currentPosition)) {
      return [currentPosition - 1, currentPosition + 1, currentPosition + 10]
    }
    else if (this.checkBottomLimit(currentPosition)) {
      return [currentPosition - 1, currentPosition + 1, currentPosition - 10]
    }
    else if (this.checkLeftLimit(currentPosition)) {
      return [currentPosition - 10, currentPosition + 10, currentPosition + 1]
    }
    else if (this.checkRightLimit(currentPosition)) {
      return [currentPosition - 10, currentPosition + 10, currentPosition - 1]
    }
    else {
      return [currentPosition + 1, currentPosition - 1, currentPosition - 10, currentPosition + 10]
    }
  }

  getNextRandomPosition(numberArray) {
    const randomIndex = Math.floor(Math.random() * numberArray.length);
  
    return numberArray[randomIndex];
  }

  addAntToTile(position) {
    const antTile = document.getElementById(position);
  
    const antDiv = document.createElement('div');
    antDiv.classList.add('ant');
  
    antTile.appendChild(antDiv);
  }

  removeAntFromTile(position) {
    const antTile = document.getElementById(position);
    const antNode = antTile.firstElementChild;
    
    antTile.removeChild(antNode);
  }

  moveAnt(position) {
    this.addAntToTile(position);
    this.antsTouchedPosition.push(position);
  
    setTimeout(() => {
      this.removeAntFromTile(position);
      this.mapPreviousTile(position);
  
      const possiblePositions = this.getAntsInstancePossibleDirection(position);
      const nextPosition = this.getNextRandomPosition(possiblePositions);
      
      this.moveAnt(nextPosition);
    }, 500);
  }

  mapPreviousTile(position) {
    const currentPosition = document.getElementById(position)
    
    if (currentPosition.classList.contains('ant-white-tile')) {
      currentPosition.classList.remove('ant-white-tile')
    } else {
      currentPosition.classList.add('ant-white-tile')
    }
  }
}

new MoveAnt(45);

module.exports = MoveAnt;

