import { useState, useEffect } from 'react'
import BoardGame from './Components/BoardGame'
import Header from './Components/Header'
import LifePanel from './Components/LifePanel'
import VictoryBtn from './Components/VictoruBtn'
import WinPanel from './Components/WinPanel'
import { type UserData, type GameStatus } from './logic/interfaces'
import AudioPlayer from 'react-audio-player'
import './Sass/App.scss'
import './Sass/Clouds.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faSuitcase, faVolumeHigh, faVolumeXmark, faWandSparkles } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { API_BASE_URL, gameStorage, userIDStorage } from './config'
import Inventory from './Components/Inventory'
import Statistics from './Components/Statistics'
import { updateUserData } from './logic/movement'

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
    maxLives: 0,
    lives: 0
  }

  const [activeGame, setActiveGame] = useState<GameStatus | null>(null)
  const [gameStatus, setGameStatus] = useState<GameStatus>(defaultGameStatus)
  const [user, setUser] = useState<UserData | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playerSkin, setPlayerSkin] = useState('pirate')

  const [theme, setTheme] = useState('pixel')

  let gameRecovered = false
  // Traer usuario y partida activa
  useEffect(() => {
    const userID = localStorage.getItem(userIDStorage) ?? new Date().getTime()
    localStorage.setItem(userIDStorage, userID.toString())
    const getActiveGame = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/onload`, { userID })
        setUser(response.data.user)
        setActiveGame(response.data.game)
        setLoading(false)
        updateUserData(setPlayerSkin, response.data.user, setUser)
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
    const storageData = localStorage.getItem(gameStorage)
    if (!storageData) return
    const recoveredGameStatus: GameStatus = JSON.parse(storageData)
    setGameStatus(recoveredGameStatus)
    gameRecovered = true
  }, [])

  // Actualizar la partida en el localStorage
  useEffect(() => {
    localStorage.setItem(gameStorage, JSON.stringify(gameStatus))
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
      <LifePanel stops={gameStatus.lives} user={user}/>
      <BoardGame gameStatus={gameStatus} user={user} setUser={setUser} setGameStatus={setGameStatus} playerSkin={playerSkin}/>
      {showPopup && <WinPanel isWin={gameStatus.isWin} user={user} lives={gameStatus.lives} setShowPopup={setShowPopup} setShowStatistics={setShowStatistics} setShowInventory={setShowInventory}/>}
      {showInventory && <Inventory user={user} setUser={setUser} setShowInventory={setShowInventory} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>}
      {showStatistics && <Statistics setShowStatistics={setShowStatistics} user={user}/>}
      <div className='control-btns'>
        <FontAwesomeIcon onClick={toggleMusic} className={musicPlaying ? (soundEnabled ? 'btn' : 'btn no-music') : 'btn no-music'} icon={musicPlaying ? (soundEnabled ? faVolumeHigh : faVolumeXmark) : faVolumeXmark}/>
        <FontAwesomeIcon onClick={() => { setShowInventory(true) }} className='btn' icon={faSuitcase}/>
        <FontAwesomeIcon onClick={() => { setShowStatistics(true) }} className='btn' icon={faChartPie}/>
        <FontAwesomeIcon onClick={() => { setTheme('west') }} className='btn hide' icon={faWandSparkles}/>
        {(gameStatus.isWin || gameStatus.lives < 1) && <VictoryBtn setShowPopup={setShowPopup} />}
      </div>

      {musicPlaying && <AudioPlayer src='musictheme.mp3' autoPlay loop muted={!soundEnabled}/>}
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
