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
import { faVolumeHigh, faVolumeXmark, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { getUserDataFromStorage } from './logic/func'
import API_BASE_URL from './config'

function App () {
  const defaultGameStatus: GameStatus = {
    gameReady: false,
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

  const [activeGame, setActiveGame] = useState<GameStatus | null>(null)
  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultGameStatus)
  const [showPopup, setShowPopup] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('pixel')

  let gameRecovered = false

  // Si no tiene nada en el localStorage, guardar ahi
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

  // Traer partida activa
  useEffect(() => {
    const getActiveGame = async () => {
      try {
        const data = getUserDataFromStorage()
        const response = await axios.post(`${API_BASE_URL}/api/onload`, data)
        setActiveGame(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    void getActiveGame()
  }, [])

  // Cambiar la partida si la que trae tiene un gameID más alto
  useEffect(() => {
    if (activeGame && activeGame.gameID > gameStatus.gameID) setGameStatus(activeGame)
  }, [activeGame])

  // Si hay una partida guardada en localStorage, ponerla
  useEffect(() => {
    if (gameRecovered) return
    const storageData = localStorage.getItem('diary-tfy-game')
    if (!storageData) return
    const recoveredGameStatus: GameStatus = JSON.parse(storageData)
    setGameStatus(recoveredGameStatus)
    gameRecovered = true
  }, [])

  // Actualizar la partida en el localStorage
  useEffect(() => {
    localStorage.setItem('diary-tfy-game', JSON.stringify(gameStatus))
  }, [gameStatus])

  // Activar el menú de victoria
  useEffect(() => {
    if (!gameStatus.gameReady) return
    if ((gameStatus.isWin || gameStatus.lives < 1) && !loading) {
      setShowPopup(true)
      setSoundEnabled(false)
    }
  }, [gameStatus.isWin, gameStatus.lives])

  // Activar la música
  const toggleMusic = () => {
    if (!musicPlaying) setMusicPlaying(true)
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className={`app ${theme}`}>
      <Header />
      <LifePanel stops={gameStatus.lives} />
      <BoardGame gameStatus={gameStatus} setGameStatus={setGameStatus}/>
      {showPopup && <WinPanel isWin={gameStatus.isWin} lives={gameStatus.lives} setShowPopup={setShowPopup}/>}

      <div className='control-btns'>
        <FontAwesomeIcon onClick={toggleMusic} className={musicPlaying ? (soundEnabled ? 'music' : 'music no-music') : 'music no-music'} icon={musicPlaying ? (soundEnabled ? faVolumeHigh : faVolumeXmark) : faVolumeXmark}/>
        <FontAwesomeIcon onClick={() => { setTheme('west') }} className='music hide' icon={faWandSparkles}/>
        {(gameStatus.isWin || gameStatus.lives < 1) && <StatisticsBtn setShowPopup={setShowPopup} />}
      </div>

      {musicPlaying && <AudioPlayer src='/musictheme.mp3' autoPlay loop muted={!soundEnabled}/>}
      <div className='clouds-container'>{clouds}</div>
      <div className={'background'}></div>
    </div>
  )
}

// Crear las nubes del background
const clouds: any[] = []
for (let i = 0; i < 7; i++) {
  clouds.push(<img key={i} className={`cloud cloud${i + 1}`} src={require('./img/cloud.png')} alt='cloud' />)
}

export default App
