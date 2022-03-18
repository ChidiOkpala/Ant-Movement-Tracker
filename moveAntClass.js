class MoveAnt {
  constructor(initPosition) {
    this.antsTouchedPosition = [];
    this.initPosition = initPosition;
    this.createTiles();
    this.moveAnt(initPosition);
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

  createTiles() {
    for (let i = 0; i < 100; i++) {
      const gridContainer = document.getElementById('grid-container');
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
      this.mapPreviousTile();
  
      const possiblePositions = this.getAntsInstancePossibleDirection(position);
      const nextPosition = this.getNextRandomPosition(possiblePositions);
      
      this.moveAnt(nextPosition);
    }, 3000);
  }

  mapPreviousTile() {
    for (let i = 0; i < this.antsTouchedPosition.length; i++) {
      const antTile = document.getElementById(this.antsTouchedPosition[i]);
      
      antTile.classList.add('ant-white-tile')
    }
  }
}

const MoveMyAnt = new MoveAnt(45);

module.exports = MoveAnt;

