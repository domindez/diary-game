import { useState, useEffect } from 'react'
import BoardGame from './Components/BoardGame'
import Header from './Components/Header'
import LifePanel from './Components/LifePanel'
import WinPanel from './Components/WinPanel'
import { type GameStatus } from './logic/interfaces'
import './Sass/App.scss'
import './Sass/Clouds.scss'

function App () {
  const defaultGameStatus: GameStatus = {
    gameID: 0,
    initialPos: [],
    playerPos: [],
    bottlePos: [],
    trail: [],
    path: [],
    justDeath: false,
    canMove: false,
    clickedCell: [],
    isWin: false,
    lives: 0
  }

  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultGameStatus)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('diary-tfy-user')
    if (userData == null) {
      localStorage.setItem('diary-tfy-user', JSON.stringify({
        userID: new Date().getTime(),
        livesSaved: 0,
        nBottles: 0
      }))
    }
  }, [])

  useEffect(() => {
    if (gameStatus.isWin || gameStatus.lives < 1) setShowPopup(true)
  }, [gameStatus.isWin, gameStatus.lives])

  return (
		<div className='app' >
			<Header />
			<LifePanel stops={gameStatus.lives} />
			<BoardGame gameStatus={gameStatus}setGameStatus={setGameStatus}/>
      {showPopup && <WinPanel isWin={gameStatus.isWin} lives={gameStatus.lives} setShowPopup={setShowPopup}/>}
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
