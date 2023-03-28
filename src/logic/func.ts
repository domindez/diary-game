import { gameStorage, userIDStorage } from '../config'
import { type GameStatus, type UserData } from './interfaces'

export const getUserDataFromStorage = () => {
  let userData: UserData
  const storage = localStorage.getItem(userIDStorage)
  if (storage != null) {
    userData = JSON.parse(storage)
    return userData
  }
}

export const getGameFromStorage = () => {
  let gameData: GameStatus
  const storage = localStorage.getItem(gameStorage)
  if (storage != null) {
    gameData = JSON.parse(storage)
    return gameData
  }
}
