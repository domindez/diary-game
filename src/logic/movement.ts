import axios from 'axios'
import { API_BASE_URL, userStorage } from '../config'
import { getUserDataFromStorage } from './func'
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

  if (!canMove || lives < 1 || !cellIsClose()) return

  // Si pisa muerte
  if (!cellIsGreen()) {
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
  if (!userData) return
  userData.nBottles = userData?.nBottles + 1
  userData.livesSaved = userData.livesSaved + livesSaved
  if (userData.livesSaved >= 100) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.level = userData.level + 1
    userData.livesSaved = userData.livesSaved - 100
  }
  try {
    void axios.post(`${API_BASE_URL}/api/onwin`, userData)
  } catch (error) {
    console.error(error)
  }
  localStorage.setItem(userStorage, JSON.stringify(userData))
}
