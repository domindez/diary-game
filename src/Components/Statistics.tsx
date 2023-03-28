import Popup from './Popup'
import '../Sass/Statistics.scss'
import StatisticsBlock from './StatisticsBlock'
import ExpBar from './ExpBar'
import PowerBar from './PowerBar'
import { type UserData } from '../logic/interfaces'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  user: UserData | null
}
const Statistics = ({ setShowStatistics, user }: Props) => {
  if (!user) return <></>
  const statistics = user.statistics
  return (
		<Popup setShowPopup={setShowStatistics}>
			<div className='statistics'>
				<h3>Tus estadísticas</h3>
				<p>Nivel {user.level}</p>
				<ExpBar exp={user.livesSaved}/>
				<div className='statistics__block-container'>
					<StatisticsBlock name='Media de intentos / victoria' value={statistics.averageAttemptsPerWin}/>
					<StatisticsBlock name='Racha más larga' value={statistics.longestWinningStreak}/>
					<StatisticsBlock name='Victorias Totales' value={statistics.nWins}/>
					<StatisticsBlock name='Racha actual' value={statistics.gamesWonInARow}/>
					<PowerBar user={user}/>
					<p>Con una racha de 5 ganas 10 <img src={require('../img/lives.png')} alt='heart' /> extra en cada victoria</p>
				</div>
			</div>
		</Popup>
  )
}

export default Statistics
