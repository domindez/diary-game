import { useEffect } from 'react'
import { movement } from '../logic/movement'
import '../Sass/BoardGame.scss'
import { type GameStatus } from '../logic/interfaces'
import PrintBoardGame from './printBoardGame'

interface Props {
  gameStatus: GameStatus
  playerSkin: string
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
}

const BoardGame = ({ gameStatus, setGameStatus, playerSkin }: Props) => {
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
          {PrintBoardGame(gameStatus, clickCell, playerSkin)}
		</div>
  )
}

export default BoardGame
