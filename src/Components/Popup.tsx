import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import '../Sass/Popup.scss'

interface Props {
  children: ReactNode
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup = ({ children, setShowPopup }: Props) => {
  const { t } = useTranslation()
  return (
		<div className='overlay' onClick={() => { setShowPopup(false) }}>
			<div className='popup' onClick={(e) => { e.stopPropagation() }}>
			<FontAwesomeIcon className='close' icon={faClose} onClick={() => { setShowPopup(false) }}/>
			{children}
			</div>
			<div className='tfy-msg'>
				<p>{t('isla_misterio_msg1')} <a href='https://trivify.es/isla-misterio-para-bares.html'>Isla Misterio.</a> {t('isla_misterio_msg2')}</p>
				</div>
		</div>
  )
}

export default Popup
