export interface GameStatus {
  gameReady: boolean
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
  livesSaved: number
  nBottles: number
  level: number
}
