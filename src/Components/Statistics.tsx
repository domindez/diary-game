import Popup from './Popup'
import '../Sass/Statistics.scss'
import StatisticsBlock from './StatisticsBlock'
import ExpBar from './ExpBar'
import PowerBar from './PowerBar'
import { type UserData } from '../logic/interfaces'
import { useTranslation } from 'react-i18next'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  user: UserData | null
}
const Statistics = ({ setShowStatistics, user }: Props) => {
  const { t } = useTranslation()

  if (!user) return <></>
  const statistics = user.statistics
  return (
		<Popup setShowPopup={setShowStatistics}>
			<div className='statistics'>
				<h3>{t('your_statistics')}</h3>
				<p>{t('level')} {user.level}</p>
				<ExpBar exp={user.livesSaved}/>
				<div className='statistics__block-container'>
					<StatisticsBlock name={t('average_attempts')} value={statistics.averageAttemptsPerWin}/>
					<StatisticsBlock name={t('longest_streak')} value={statistics.longestWinningStreak}/>
					<StatisticsBlock name={t('total_winnings')} value={statistics.nWins}/>
					<StatisticsBlock name={t('current_streak')} value={statistics.gamesWonInARow}/>
					<PowerBar user={user}/>
					<p>{t('power_up_msg_bf_heart')} <img src={require('../img/lives.png')} alt='heart' /> {t('power_up_msg_aft_heart')}</p>
				</div>
			</div>
		</Popup>
  )
}

export default Statistics
