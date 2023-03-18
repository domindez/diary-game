import { useState } from 'react'
import BoardGame from './Components/BoardGame'
import Header from './Components/Header'
import LifePanel from './Components/LifePanel'
import { type GameStatus } from './logic/interfaces'
import './Sass/App.scss'
import './Sass/Clouds.scss'

function App () {
  const defaultInitialPos = [5, 0]
  const bottlePos = [2, 0]

  const defaultGameStatus = {
    gameID: 1,
    playerID: null,
    initialPos: defaultInitialPos,
    playerPos: defaultInitialPos,
    bottlePos: bottlePos,
    trail: [defaultInitialPos],
    path: [bottlePos, [5, 0], [4, 0], [3, 0], [6, 0], [7, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5]],
    justDeath: false,
    canMove: true,
    clickedCell: [],
    isWin: false,
    lives: 10,
    userBottles: 0
  }

  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultGameStatus)

  return (
		<div className='app' >
			<Header />
			<LifePanel stops={gameStatus.lives} userBottles={gameStatus.userBottles}/>
			<BoardGame
			gameStatus={gameStatus}
			setGameStatus={setGameStatus}/>
			<div className='clouds-container'>{clouds}</div>
			<div className='background'></div>
		</div>
  )
}

const clouds: any[] = []
for (let i = 0; i < 7; i++) {
  clouds.push(<img key={i} className={`cloud cloud${i + 1}`} src={require('./img/cloud.png')} alt='cloud' />)
}

export default App
