import { useEffect } from 'react'
import { movement } from '../logic/movement'
import '../Sass/BoardGame.scss'
import { type UserData, type GameStatus } from '../logic/interfaces'
import PrintBoardGame from './printBoardGame'

interface Props {
  gameStatus: GameStatus
  playerSkin: string
  user: UserData | null
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
}

const BoardGame = ({ gameStatus, setGameStatus, playerSkin, user, setUser }: Props) => {
  // Actualizar celda clicada en el GameStatus
  const clickCell = (coordenadasCelda: number[]) => {
    if (!gameStatus.canMove) return
    setGameStatus({ ...gameStatus, clickedCell: coordenadasCelda })
  }

  // Hacer el movimiento
  useEffect(() => {
    movement(gameStatus, setGameStatus, user, setUser)
  }, [gameStatus.clickedCell])

  return (
		<div className='boardgame'>
          {PrintBoardGame(gameStatus, clickCell, playerSkin)}
		</div>
  )
}

export default BoardGame
