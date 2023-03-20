import { getUserDataFromStorage } from '../logic/func'
import { useEffect, useState } from 'react'
import Popup from './Popup'
import ShareBtns from './ShareBtns'

interface Props {
  lives: number
  isWin: boolean
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const WinPanel = ({ lives, isWin, setShowPopup }: Props) => {
  const userData = getUserDataFromStorage()

  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => { clearInterval(intervalId) }
  }, [])

  const countDownDate = new Date(
    `${currentTime.getFullYear()}-${
      currentTime.getMonth() + 1
    }-${currentTime.getDate()} 23:59:59`
  ).getTime()

  const distance = countDownDate - currentTime.getTime()

  const getRemainingTime = () => {
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  if (isWin) {
    return (
      <Popup setShowPopup={setShowPopup}>
        <img className='popup__img' src={require('../img/win-beer.png')} alt='bottle' />
        <h2>¡Cerveeeeeeeza!</h2>
        <div className='popup__block-container'>
          <div className='popup__block-panel'>
            <img src={require('../img/lives.png')} alt='lives' />
            <p> x{userData?.livesSaved}</p>
          </div>
          <div className='popup__block-panel'>
            <img className='beer' src={require('../img/beer.png')} alt='lives' />
            <p> x{userData?.nBottles}</p>
          </div>
        </div>
        <p>Hoy has ganado {lives} <img src={require('../img/lives.png')} alt='lives' /></p>
        <ShareBtns lives={lives} />
        <p>Vuelve mañana</p>
        <p>¡El camino cambia cada día!</p>
        <p className='countdown'>{getRemainingTime()}</p>
      </Popup>
    )
  } else {
    return (
			<Popup setShowPopup={setShowPopup}>
			<img className='popup__img' src={require('../img/police.png')} alt='bottle' />
			<h2>¿A dónde ibas dando tumbos?</h2>
			<div className='popup__block-container'>
				<div className='popup__block-panel'>
				<img src={require('../img/lives.png')} alt='lives' />
				<p> x{userData?.livesSaved}</p>
				</div>
			<div className='popup__block-panel'>
				<img className='beer' src={require('../img/beer.png')} alt='lives' />
				<p> x{userData?.nBottles}</p>
			</div>
			</div>
			<p>Hoy has ganado {lives} <img src={require('../img/lives.png')} alt='lives' /></p>
			<ShareBtns lives={lives}/>
			<p>Vuelve mañana</p>
			<p>¡El camino cambia cada día!</p>
			<p className='countdown'>{getRemainingTime()}</p>
		</Popup>
    )
  }
}

export default WinPanel
