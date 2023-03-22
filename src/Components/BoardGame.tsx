import { useEffect } from 'react'
import { movement } from '../logic/movement'
import '../Sass/BoardGame.scss'
import { type GameStatus } from '../logic/interfaces'
import PrintBoardGame from './printBoardGame'

interface Props {
  gameStatus: GameStatus
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
}

const BoardGame = ({ gameStatus, setGameStatus }: Props) => {
  // Actualizar cerlda clicada en el GameStatus
  const clickCell = (coordenadasCelda: number[]) => {
    if (!gameStatus.canMove) return
    setGameStatus({ ...gameStatus, clickedCell: coordenadasCelda })
  }

  // Hacer el movimiento
  useEffect(() => {
    movement(gameStatus, setGameStatus)
  }, [gameStatus.clickedCell])

  return (
		<div className='boardgame'>
          {PrintBoardGame(gameStatus, clickCell)}
		</div>
  )
}

export default BoardGame
