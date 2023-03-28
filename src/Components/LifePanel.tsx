import { type UserData } from '../logic/interfaces'
import '../Sass/LifePanel.scss'
interface Props {
  stops: number
  user: UserData | null
}

const LifePanel = ({ stops, user }: Props) => {
  return (
		<div className='life-panel'>
      <div className='panel-container'>
        <img className='stop-icon' src={require('../img/lives.png')} alt='stop' />
        <p>· {stops}</p>
      </div>
      <div className='panel-container'>
        <img className='beer-icon' src={require('../img/beer.png')} alt='stop' />
        <p>· {user?.nBottles}</p>
      </div>
		</div>
  )
}

export default LifePanel
