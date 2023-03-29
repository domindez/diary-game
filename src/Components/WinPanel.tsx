import { useEffect, useState } from 'react'
import boltActive from '../img/bolt-active.svg'
import Popup from './Popup'
import ShareBtns from './ShareBtns'
import ExpBar from './ExpBar'
import '../Sass/WinPannel.scss'
import { type UserData } from '../logic/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

interface Props {
  lives: number
  isWin: boolean
  user: UserData | null
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  setShowInventory: React.Dispatch<React.SetStateAction<boolean>>
}

const WinPanel = ({ lives, isWin, setShowPopup, setShowStatistics, user, setShowInventory }: Props) => {
  const { t } = useTranslation()
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
            <p>{t('level')} {user?.level} {user?.bonus && <img src={boltActive} alt='bolt' />}</p>
            {user && <ExpBar exp={user.livesSaved} />}
          </div>
          <div className='control-btns'>
            <FontAwesomeIcon onClick={() => { setShowPopup(false); setShowInventory(true) }} className='btn onwin' icon={faSuitcase}/>
            <FontAwesomeIcon onClick={() => { setShowPopup(false); setShowStatistics(true) }} className='btn onwin' icon={faChartPie}/>
          </div>
          <img className='win-panel__img' src={require('../img/win-beer.png')} alt='bottle' />
          <h2>{t('win_msg')}</h2>
          <div className='win-panel__block-container' onClick={showStatistics}>
            <div className='win-panel__block-panel'>
              <img src={require('../img/lives.png')} alt='lives' />
              <p> +{lives + (user?.bonus ? 10 : 0)}</p>
            </div>
            <div className='win-panel__block-panel'>
              <img className='beer' src={require('../img/beer.png')} alt='lives' />
              <p> x{user?.nBottles}</p>
            </div>
          </div>
          <p>{t('share_msg')}</p>
          <ShareBtns lives={lives} />
          <p>{t('win_popup_msg1')}</p>
          <p>{t('win_popup_msg2')}</p>
          <p className='countdown'>{getRemainingTime()}</p>
        </div>

      </Popup>
    )
  } else {
    return (

      <Popup setShowPopup={setShowPopup}>
      <div className='win-panel'>
        <div className='lvl-container' onClick={showStatistics}>
          <p>{t('level')} {user?.level} {user?.bonus && <img src={boltActive} alt='bolt' />}</p>
          {user && <ExpBar exp={user.livesSaved} />}
        </div>
        <div className='control-btns'>
          <FontAwesomeIcon onClick={() => { setShowPopup(false); setShowInventory(true) }} className='btn onwin' icon={faSuitcase}/>
          <FontAwesomeIcon onClick={() => { setShowPopup(false); setShowStatistics(true) }} className='btn onwin' icon={faChartPie}/>
        </div>
        <img className='win-panel__img' src={require('../img/police.png')} alt='bottle' />
        <h2>{t('lose_msg')}</h2>
        <div className='win-panel__block-container' onClick={showStatistics}>
          <div className='win-panel__block-panel'>
          <img src={require('../img/lives.png')} alt='lives' />
          <p> +{lives + (user?.bonus ? 10 : 0)}</p>
          </div>
        <div className='win-panel__block-panel'>
          <img className='beer' src={require('../img/beer.png')} alt='lives' />
          <p> x{user?.nBottles}</p>
        </div>
        </div>
        <p>{t('share_msg')}</p>
        <ShareBtns lives={lives}/>
        <p>{t('win_popup_msg1')}</p>
        <p>{t('win_popup_msg2')}</p>
        <p className='countdown'>{getRemainingTime()}</p>
      </div>

		</Popup>
    )
  }
}

export default WinPanel
