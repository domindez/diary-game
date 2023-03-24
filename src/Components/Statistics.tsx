import Popup from './Popup'
import '../Sass/Statistics.scss'
import StatisticsBlock from './StatisticsBlock'
import { getUserDataFromStorage } from '../logic/func'
import ExpBar from './ExpBar'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
}
const Statistics = ({ setShowStatistics }: Props) => {
  const userData = getUserDataFromStorage()
  if (!userData) return <></>
  const statistics = userData.statistics

  return (
		<Popup setShowPopup={setShowStatistics}>
			<div className='statistics'>
				<h3>Tus estadísticas</h3>
				<p>Nivel {userData.level}</p>
				<ExpBar exp={userData.livesSaved}/>
				<div className='statistics__block-container'>
					<StatisticsBlock name='Media de intentos / victoria' value={statistics.averageAttemptsPerWin}/>
					<StatisticsBlock name='Racha más larga' value={statistics.longestWinningStreak}/>
					<StatisticsBlock name='Victorias Totales' value={statistics.nWins}/>
					<StatisticsBlock name='Racha actual' value={statistics.nWins}/>
				</div>
			</div>
		</Popup>
  )
}

export default Statistics
