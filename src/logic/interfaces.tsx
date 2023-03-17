export interface GameStatus {
  initialPos: number[]
  playerPos: number[]
  bottlePos: number[]
  path: number[][]
  trail: number[][]
  justDeath: boolean
  canMove: boolean
  isWin: boolean
  clickedCell: number[]
}
