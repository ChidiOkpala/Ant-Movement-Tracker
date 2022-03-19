/**
 * @jest-environment jsdom
 */

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./index.html');

const MoveAnt = require('./moveAntClass.js');

describe('The ant takes the initial position when class is initialised', () => {
  test('moveAnt constructs with the specific initialPosition', () => {
    const testAnt = new MoveAnt(90);
  
    expect(testAnt).toMatchObject({ "initPosition": 90 });
  });
  
  test('the first position is recorded as a touched position when ant leaves the first position', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt).toMatchObject({ "antsTouchedPosition": [45] });
  });
});

describe('The ant has options that make it move in 2 dimension from any position', () => {
  test('the ant has two tile options when it is at tile 0', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(0).length).toEqual(2);
  });
  
  test('the ant has tile options 1 and 10 when it is at tile 0', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(0)).toEqual([1, 10]);
  });
  
  test('the ant has two tile options when it is at tile 99', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(99).length).toEqual(2);
  });
  
  test('the ant has tile options 98 and 89 when it is at tile 99', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(99)).toEqual([98, 89]);
  });
  
  test('the ant has four tile option when it is at tile 45', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(45).length).toEqual(4);
  });
  
  test('the ant has tile option 46, 44, 35, 55 when it is at tile 45', () => {
    const testAnt = new MoveAnt(45);
  
    expect(testAnt.getAntsInstancePossibleDirection(45)).toEqual([46, 44, 35, 55]);
  });
});

describe('That the check limit functions return desired values', () => {
  test('the checkRightLimit returns false when ant is not at the extreme right line', () => {
    const position = 35
    const testAnt = new MoveAnt(position);
  
    expect(testAnt.checkRightLimit(position)).toEqual(false);
  });

  test('the checkLeftLimit returns false when ant is not at the extreme left line', () => {
    const position = 65
    const testAnt = new MoveAnt(position);
  
    expect(testAnt.checkLeftLimit(position)).toEqual(false);
  });

  test('the checkTopLimit returns false when ant is not at the extreme top line', () => {
    const position = 95
    const testAnt = new MoveAnt(position);
  
    expect(testAnt.checkTopLimit(position)).toEqual(false);
  });

  test('the checkBottomLimit returns false when ant is not at the extreme bottom line', () => {
    const position = 15
    const testAnt = new MoveAnt(position);
  
    expect(testAnt.checkBottomLimit(position)).toEqual(false);
  });

  test('the ant cannot go below the base line 90 - 99', () => {
    const testAnt = new MoveAnt(95);
  
    expect(testAnt.checkBottomLimit(95)).toEqual(true);
  });
  
  test('the ant cannot go above the top line 0 - 9', () => {
    const testAnt = new MoveAnt(6);
  
    expect(testAnt.checkTopLimit(6)).toEqual(true);
  });
  
  test('the ant cannot go outside from the extreme left line (positions ending with zero(0))', () => {
    const testAnt = new MoveAnt(6);
  
    expect(testAnt.checkLeftLimit(30)).toEqual(true);
  });
  
  test('the ant cannot go outside from the extreme right line (positions ending with nine(9))', () => {
    const testAnt = new MoveAnt(79);
  
    expect(testAnt.checkRightLimit(79)).toEqual(true);
  });
});

test('the next ant random position value is among the possible options when at the center', () => {
  const testAnt = new MoveAnt(79);
  const possibleValues = testAnt.getAntsInstancePossibleDirection(45)

  expect(possibleValues).toContain(testAnt.getNextRandomPosition(possibleValues));
});

test('the next ant random position value is among the possible options when at the extreme end', () => {
  const testAnt = new MoveAnt(99);
  const possibleValues = testAnt.getAntsInstancePossibleDirection(99)

  expect(possibleValues).toContain(testAnt.getNextRandomPosition(possibleValues));
});
