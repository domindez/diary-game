import { getUserDataFromStorage } from '../logic/func'
import '../Sass/LifePanel.scss'
interface Props {
  stops: number
}

const LifePanel = ({ stops }: Props) => {
  const userData = getUserDataFromStorage()

  return (
		<div className='life-panel'>
      <div className='panel-container'>
        <img className='stop-icon' src={require('../img/lives.png')} alt='stop' />
        <p>· {stops}</p>
      </div>
      <div className='panel-container'>
        <img className='beer-icon' src={require('../img/beer.png')} alt='stop' />
        <p>· {userData?.nBottles}</p>
      </div>
		</div>
  )
}

export default LifePanel
