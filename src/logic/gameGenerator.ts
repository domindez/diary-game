const defaultInitialPos = [6, 0]
const bottlePos = [2, 0]

export const game1 = {
  gameID: 2,
  initialPos: defaultInitialPos,
  playerPos: defaultInitialPos,
  bottlePos: bottlePos,
  trail: [defaultInitialPos],
  path: [bottlePos, [5, 0], [4, 0], [3, 0], [6, 0], [7, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5]],
  justDeath: false,
  canMove: true,
  clickedCell: [],
  isWin: false,
  lives: 3,
  userBottles: 0
}
