import '../Sass/LifePanel.scss'
interface Props {
  stops: number
  userBottles: number
}

const LifePanel = ({ stops, userBottles }: Props) => {
  return (
		<div className='life-panel'>
      <div className='stop-container'>
        <img className='stop' src={require('../img/stop.png')} alt='stop' />
        <p>{stops}</p>
      </div>
		</div>
  )
}

export default LifePanel
