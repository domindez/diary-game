import { type GameStatus } from './interfaces'

export const manageLocalStorage = (gameStatus: GameStatus, setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>) => {
  const storage = localStorage.getItem('diary-tfy-game')
  let userGameStatus: GameStatus
  if (storage != null) {
    userGameStatus = JSON.parse(storage)
    if (userGameStatus.gameID === gameStatus.gameID) {
      console.log('Este juego está en marcha')
      setGameStatus(userGameStatus)
    }

    // Si no es el mismo gameID
  } else {
    localStorage.setItem('diary-tfy-game', JSON.stringify(gameStatus))
  }
}
