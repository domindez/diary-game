import { type UserData } from '../logic/interfaces'
import Popup from './Popup'

interface Props {
  lives: number
  isWin: boolean
}

const WinPanel = ({ lives, isWin }: Props) => {
  let userData: UserData
  let livesSaved = 0
  let userBottles = 0
  const storage = localStorage.getItem('diary-tfy-user')
  if (storage != null) {
    userData = JSON.parse(storage)
    livesSaved = userData.livesSaved
    userBottles = userData.nBottles
  }
  if (isWin) {
    return (
		<Popup>
			<img className='popup__img' src={require('../img/beer.png')} alt='bottle' />
			<h2>¡Cerveeeeeza!</h2>
			<br />
			<p>Has salvado {lives} <img src={require('../img/lives.png')} alt='lives' /> hoy</p>
			<div className='popup__block-container'>
				<div className='popup__block-panel'>
				<img src={require('../img/lives.png')} alt='lives' />
				<p> x{livesSaved}</p>
				</div>
			<div className='popup__block-panel'>
				<img src={require('../img/beer.png')} alt='lives' />
				<p> x{userBottles}</p>
			</div>
			</div>
		</Popup>
    )
  } else {
    return (
			<Popup>
				<h2>No has ganado</h2>
			</Popup>
    )
  }
}

export default WinPanel
