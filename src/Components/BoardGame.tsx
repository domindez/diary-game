import { useEffect } from 'react'
import printBoardGame from '../logic/printBoardGame'
import { movement } from '../logic/movement'
import '../Sass/BoardGame.scss'
import { type GameStatus } from '../logic/interfaces'

interface Props {
  gameStatus: GameStatus
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
  defaultInitialPos: number[]
}

const BoardGame = ({ gameStatus, setGameStatus, defaultInitialPos }: Props) => {
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
