import { getUserDataFromStorage } from '../logic/func'
import Popup from './Popup'
import ShareBtns from './ShareBtns'

interface Props {
  lives: number
  isWin: boolean
}

const WinPanel = ({ lives, isWin }: Props) => {
  const userData = getUserDataFromStorage()

  if (isWin) {
    return (
		<Popup>
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
			<ShareBtns lives={lives}/>
			<p>Vuelve mañana</p>
			<p>¡El camino cambia cada día!</p>
		</Popup>
    )
  } else {
    return (
			<Popup>
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
		</Popup>
    )
  }
}

export default WinPanel
