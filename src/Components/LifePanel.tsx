import { type UserData } from '../logic/interfaces'
import '../Sass/LifePanel.scss'
interface Props {
  stops: number
}

const LifePanel = ({ stops }: Props) => {
  let userData: UserData
  let userBottles = 0
  const storage = localStorage.getItem('diary-tfy-user')
  if (storage != null) {
    userData = JSON.parse(storage)
    userBottles = userData.nBottles
  }

  return (
		<div className='life-panel'>
      <div className='panel-container'>
        <img className='stop-icon' src={require('../img/lives.png')} alt='stop' />
        <p>· {stops}</p>
      </div>
      <div className='panel-container'>
        <img className='beer-icon' src={require('../img/beer.png')} alt='stop' />
        <p>· {userBottles}</p>
      </div>
		</div>
  )
}

export default LifePanel
