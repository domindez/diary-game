import axios from 'axios'
import { API_BASE_URL, userStorage } from '../config'
import { getGameFromStorage, getUserDataFromStorage } from './func'
import { type GameStatus } from './interfaces'

export const movement = (gameStatus: GameStatus, setGameStatus: any) => {
  const playerPos = gameStatus.playerPos
  const trail = gameStatus.trail
  const clickedCell = gameStatus.clickedCell
  const path = gameStatus.path
  const canMove = gameStatus.canMove
  const lives = gameStatus.lives
  const bottle = gameStatus.bottlePos
  const initialPos = gameStatus.initialPos

  const x = 1
  const y = 0

  const cellIsGreen = () => {
    for (let i = 0; i < path.length; i++) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (path[i].every((value: number, index: number) => value === clickedCell[index])) {
        return true
      }
    }
    return false
  }

  const cellIsClose = () => {
    if ((clickedCell[y] === playerPos[y] - 1 && clickedCell[x] === playerPos[x]) ||
    (clickedCell[y] === playerPos[y] + 1 && clickedCell[x] === playerPos[x]) ||
    (clickedCell[x] === playerPos[x] + 1 && clickedCell[y] === playerPos[y]) ||
    (clickedCell[x] === playerPos[x] - 1 && clickedCell[y] === playerPos[y])) {
      return true
    }
    return false
  }

  const cellIsBottle = () => {
    for (let i = 0; i < bottle.length; i++) {
      if (bottle[i] !== clickedCell[i]) {
        return false
      }
    }
    return true
  }

  if (lives < 1 && gameStatus.gameReady) loseLogic()

  if (!canMove || lives < 1 || !cellIsClose()) return

  // Si pisa muerte
  if (!cellIsGreen()) {
    const userData = getUserDataFromStorage()
    if (!userData) return
    userData.statistics.totalDeaths++
    userData.statistics.averageAttemptsPerWin = parseFloat((userData.statistics.totalDeaths / userData.statistics.nWins).toFixed(1))
    localStorage.setItem(userStorage, JSON.stringify(userData))
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        justDeath: true,
        playerPos: [],
        canMove: false,
        lives: lives - 1
      }
      return newGameStatus
    })
    setTimeout(() => {
      setGameStatus((prevGameStatus: GameStatus) => {
        const newGameStatus = {
          ...prevGameStatus,
          playerPos: initialPos,
          trail: [initialPos],
          justDeath: false,
          canMove: true
        }
        return newGameStatus
      })
    }, 500)
    return
  }

  // Si coge la cerveza
  if (cellIsBottle()) {
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        bottlePos: [],
        canMove: false,
        isWin: true
      }
      winLogic(prevGameStatus.lives)
      const audio = new Audio('endgame.mp3')
      void audio.play()
      return newGameStatus
    })
  }

  // Move Up
  if (clickedCell[y] === playerPos[y] - 1) {
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        playerPos: [playerPos[y] - 1, playerPos[x]],
        trail: [...trail, clickedCell]
      }
      return newGameStatus
    })
  // Move Down
  } else if (clickedCell[y] === playerPos[y] + 1) {
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        playerPos: [playerPos[y] + 1, playerPos[x]],
        trail: [...trail, clickedCell]
      }
      return newGameStatus
    })
  // Move Right
  } else if (clickedCell[x] === playerPos[x] + 1) {
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        playerPos: [playerPos[y], playerPos[x] + 1],
        trail: [...trail, clickedCell]
      }
      return newGameStatus
    })
  // Move Left
  } else if (clickedCell[x] === playerPos[x] - 1) {
    setGameStatus((prevGameStatus: GameStatus) => {
      const newGameStatus = {
        ...prevGameStatus,
        playerPos: [playerPos[y], playerPos[x] - 1],
        trail: [...trail, clickedCell]
      }
      return newGameStatus
    })
  }
}

const winLogic = (livesSaved: number) => {
  const userData = getUserDataFromStorage()
  const gameData = getGameFromStorage()
  if (!userData || !gameData) return

  userData.nBottles++
  userData.statistics.nWins++
  if (userData.statistics.lastGameWonID === gameData.gameID - 1) {
    userData.statistics.gamesWonInARow++
  } else {
    userData.statistics.gamesWonInARow = 1
  }
  if (userData.statistics.gamesWonInARow >= 5) userData.bonus = true
  userData.livesSaved = userData.livesSaved + livesSaved + (userData.bonus ? 10 : 0)
  if (userData.livesSaved >= 100) {
    userData.level++
    userData.livesSaved = userData.livesSaved - 100
  }
  if (userData.statistics.longestWinningStreak < userData.statistics.gamesWonInARow) userData.statistics.longestWinningStreak = userData.statistics.gamesWonInARow
  userData.statistics.lastGameWonID = gameData.gameID
  userData.statistics.averageAttemptsPerWin = parseFloat((userData.statistics.totalDeaths / userData.statistics.nWins).toFixed(1))

  // Guardar en el localstorage
  localStorage.setItem(userStorage, JSON.stringify(userData))

  // Envíar al backend
  try {
    void axios.post(`${API_BASE_URL}/api/onwin`, userData)
  } catch (error) {
    console.error(error)
  }
}

const loseLogic = () => {
  const userData = getUserDataFromStorage()
  if (!userData) return
  userData.bonus = false
  localStorage.setItem(userStorage, JSON.stringify(userData))
  try {
    void axios.post(`${API_BASE_URL}/api/onwin`, userData)
  } catch (error) {
    console.error(error)
  }
}

export const updateUserData = (setPlayerSkin: React.Dispatch<React.SetStateAction<string>>) => {
  const userData = getUserDataFromStorage()
  const gameData = getGameFromStorage()
  if (!userData || !gameData) return
  // Poner el último aspecto que usó
  setPlayerSkin(userData.usingSkin)

  // Comprobar bonus
  if (userData.bonus && userData.statistics.lastGameWonID !== gameData.gameID - 1 && !gameData.isWin) userData.bonus = false
  if (userData.statistics.lastGameWonID !== gameData.gameID - 1 && !gameData.isWin) userData.statistics.gamesWonInARow = 0
  localStorage.setItem(userStorage, JSON.stringify(userData))
}
