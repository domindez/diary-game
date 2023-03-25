import { getUserDataFromStorage } from '../logic/func'
import { useEffect, useState } from 'react'
import boltActive from '../img/bolt-active.svg'
import Popup from './Popup'
import ShareBtns from './ShareBtns'
import ExpBar from './ExpBar'
import '../Sass/WinPannel.scss'

interface Props {
  lives: number
  isWin: boolean
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
}

const WinPanel = ({ lives, isWin, setShowPopup, setShowStatistics }: Props) => {
  const userData = getUserDataFromStorage()

  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => { clearInterval(intervalId) }
  }, [])

  const countDownDate = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    23,
    59,
    59
  ).getTime()

  const distance = countDownDate - Date.now()

  const getRemainingTime = () => {
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  const showStatistics = () => {
    setShowPopup(false)
    setShowStatistics(true)
  }

  if (isWin) {
    return (
      <Popup setShowPopup={setShowPopup}>
        <div className='win-panel'>
          <div className='lvl-container' onClick={showStatistics}>
            <p>Nivel {userData?.level} {userData?.bonus && <img src={boltActive} alt='bolt' />}</p>
            {userData && <ExpBar exp={userData.livesSaved} />}
          </div>
          <img className='win-panel__img' src={require('../img/win-beer.png')} alt='bottle' />
          <h2>¡Cerveeeeeeeza!</h2>
          <div className='win-panel__block-container' onClick={showStatistics}>
            <div className='win-panel__block-panel'>
              <img src={require('../img/lives.png')} alt='lives' />
              <p> +{lives + (userData?.bonus ? 10 : 0)}</p>
            </div>
            <div className='win-panel__block-panel'>
              <img className='beer' src={require('../img/beer.png')} alt='lives' />
              <p> x{userData?.nBottles}</p>
            </div>
          </div>
          <p>Comparte y reta a tus amigos</p>
          <ShareBtns lives={lives} />
          <p>Vuelve mañana</p>
          <p>¡El camino cambia cada día!</p>
          <p className='countdown'>{getRemainingTime()}</p>
        </div>

      </Popup>
    )
  } else {
    return (

      <Popup setShowPopup={setShowPopup}>
      <div className='win-panel'>
          <div className='lvl-container' onClick={showStatistics}>
            <p>Nivel {userData?.level} {userData?.bonus && <img src={boltActive} alt='bolt' />}</p>
            {userData && <ExpBar exp={userData.livesSaved} />}
          </div>
        <img className='win-panel__img' src={require('../img/police.png')} alt='bottle' />
        <h2>¿A dónde ibas dando tumbos?</h2>
        <div className='win-panel__block-container' onClick={showStatistics}>
          <div className='win-panel__block-panel'>
          <img src={require('../img/lives.png')} alt='lives' />
          <p> +{lives + (userData?.bonus ? 10 : 0)}</p>
          </div>
        <div className='win-panel__block-panel'>
          <img className='beer' src={require('../img/beer.png')} alt='lives' />
          <p> x{userData?.nBottles}</p>
        </div>
        </div>
        <p>Comparte y reta a tus amigos</p>
        <ShareBtns lives={lives}/>
        <p>Vuelve mañana</p>
        <p>¡El camino cambia cada día!</p>
        <p className='countdown'>{getRemainingTime()}</p>
      </div>

		</Popup>
    )
  }
}

export default WinPanel
