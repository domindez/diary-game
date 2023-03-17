import { type GameStatus } from './interfaces'

export const movement = (gameStatus: GameStatus, setGameStatus: any) => {
  const playerPos = gameStatus.playerPos
  const trail = gameStatus.trail
  const clickedCell = gameStatus.clickedCell
  const path = gameStatus.path
  const canMove = gameStatus.canMove
  const stops = gameStatus.stops

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

  if (!canMove) return

  if (!cellIsGreen() && cellIsClose()) {
    setGameStatus({
      ...gameStatus,
      justDeath: true,
      playerPos: [],
      canMove: false,
      stops: stops + 1
    })
    return
  }

  // Move Up
  if (clickedCell[y] === playerPos[y] - 1 && clickedCell[x] === playerPos[x]) {
    setGameStatus({
      ...gameStatus,
      playerPos: [playerPos[y] - 1, playerPos[x]],
      trail: [...trail, clickedCell]
    })
  // Move Down
  } else if (clickedCell[y] === playerPos[y] + 1 && clickedCell[x] === playerPos[x]) {
    setGameStatus({
      ...gameStatus,
      playerPos: [playerPos[y] + 1, playerPos[x]],
      trail: [...trail, clickedCell],
      justDeath: true
    })
  // Move Right
  } else if (clickedCell[x] === playerPos[x] + 1 && clickedCell[y] === playerPos[y]) {
    setGameStatus({
      ...gameStatus,
      playerPos: [playerPos[y], playerPos[x] + 1],
      trail: [...trail, clickedCell]
    })
  // Move Left
  } else if (clickedCell[x] === playerPos[x] - 1 && clickedCell[y] === playerPos[y]) {
    setGameStatus({
      ...gameStatus,
      playerPos: [playerPos[y], playerPos[x] - 1],
      trail: [...trail, clickedCell]
    })
  }
}
