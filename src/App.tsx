import BoardGame from './Components/BoardGame'
import Header from './Components/Header'
import './Sass/App.scss'
import './Sass/Clouds.scss'

function App () {
  const clouds = []
  for (let i = 0; i < 7; i++) {
    clouds.push(<img key={i} className={`cloud cloud${i + 1}`} src={require('./img/cloud.png')} alt='cloud' />)
  }

  return (
		<div className='app' >
			<Header />
			<BoardGame />
				<div className='clouds-container'>{clouds}</div>
				<div className='background'></div>
		</div>
  )
}

export default App
