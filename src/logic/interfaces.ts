export interface GameStatus {
  gameID: number
  playerID: null | number
  initialPos: number[]
  playerPos: number[]
  bottlePos: number[]
  path: number[][]
  trail: number[][]
  justDeath: boolean
  canMove: boolean
  isWin: boolean
  clickedCell: number[]
  lives: number
  userBottles: number
}
