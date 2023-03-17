import { useState, useEffect } from 'react'
import printBoardGame from '../logic/printBoardGame'
import { movement } from '../logic/movement'
import '../Sass/BoardGame.scss'
import { type GameStatus } from '../logic/interfaces'

const BoardGame = () => {
  const defaultInitialPos = [5, 0]

  const defaultGameStatus = {
    initialPos: defaultInitialPos,
    playerPos: defaultInitialPos,
    bottlePos: [10, 5],
    trail: [defaultInitialPos],
    path: [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5]],
    justDeath: false,
    canMove: true,
    clickedCell: [],
    isWin: false
  }

  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultGameStatus)

  const clickCell = (coordenadasCelda: number[]) => {
    if (!gameStatus.canMove) return
    setGameStatus({ ...gameStatus, clickedCell: coordenadasCelda })
  }

  useEffect(() => {
    movement(gameStatus, setGameStatus)
  }, [gameStatus.clickedCell])

  useEffect(() => {
    if (!gameStatus.justDeath) return
    setTimeout(() => {
      setGameStatus({
        ...gameStatus,
        playerPos: defaultInitialPos,
        trail: [defaultInitialPos],
        justDeath: false,
        canMove: true
      })
    }, 2000)
  }, [gameStatus.justDeath])
  return (
		<div className='boardgame'>
          {printBoardGame(gameStatus, clickCell)}
		</div>
  )
}

export default BoardGame
