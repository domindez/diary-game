export interface GameStatus {
  gameID: number
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
}

export interface UserData {
  userID: null
  livesSaved: 0
  nBottles: 0
}
