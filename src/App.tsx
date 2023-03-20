import { useState, useEffect } from 'react'
import BoardGame from './Components/BoardGame'
import Header from './Components/Header'
import LifePanel from './Components/LifePanel'
import StatisticsBtn from './Components/StatisticsBtn'
import WinPanel from './Components/WinPanel'
import { type GameStatus } from './logic/interfaces'
import AudioPlayer from 'react-audio-player'
import './Sass/App.scss'
import './Sass/Clouds.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

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
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

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

  const toggleMusic = () => {
    if (!musicPlaying) setMusicPlaying(true)
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className='app'>
      <Header />
      <LifePanel stops={gameStatus.lives} />
      <BoardGame gameStatus={gameStatus} setGameStatus={setGameStatus}/>
      {showPopup && <WinPanel isWin={gameStatus.isWin} lives={gameStatus.lives} setShowPopup={setShowPopup}/>}

      <div className='control-btns'>
        <FontAwesomeIcon onClick={toggleMusic} className={musicPlaying ? (soundEnabled ? 'music' : 'music no-music') : 'music no-music'} icon={musicPlaying ? (soundEnabled ? faVolumeHigh : faVolumeXmark) : faVolumeXmark}/>

        {(gameStatus.isWin || gameStatus.lives < 1) && <StatisticsBtn setShowPopup={setShowPopup} />}
      </div>

      {musicPlaying && <AudioPlayer src='/musictheme.mp3' autoPlay loop muted={!soundEnabled}/>}
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
