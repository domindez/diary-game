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
  let savedGame = false

  const clickCell = (coordenadasCelda: number[]) => {
    if (!gameStatus.canMove) return
    setGameStatus({ ...gameStatus, clickedCell: coordenadasCelda })
  }

  useEffect(() => {
    movement(gameStatus, setGameStatus)
  }, [gameStatus.clickedCell])

  useEffect(() => {
    if (savedGame) return
    const recoveredGameStatus = localStorage.getItem('diary-tfy-game')
    if (recoveredGameStatus == null) return
    setGameStatus(JSON.parse(recoveredGameStatus))
    savedGame = true
  }, [])

  useEffect(() => {
    localStorage.setItem('diary-tfy-game', JSON.stringify(gameStatus))
  }, [gameStatus])

  return (
		<div className='boardgame'>
          {PrintBoardGame(gameStatus, clickCell)}
		</div>
  )
}

export default BoardGame
