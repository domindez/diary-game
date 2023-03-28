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
  maxLives: number
  lives: number
}

interface statistics {
  nWins: number
  gamesWonInARow: number
  longestWinningStreak: number
  averageAttemptsPerWin: number
  lastGameWonID: number
  totalDeaths: number
}

export interface UserData {
  userID: string
  livesSaved: number
  nBottles: number
  level: number
  skins: string[]
  usingSkin: string
  statistics: statistics
  bonus: boolean
  extras: object
}
