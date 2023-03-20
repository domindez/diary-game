import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const StatisticsBtn = ({ setShowPopup }: Props) => {
  return <FontAwesomeIcon className='statistics-btn' onClick={() => { setShowPopup(true) }} icon={faChartPie} />
}

export default StatisticsBtn
