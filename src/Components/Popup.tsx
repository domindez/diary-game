import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode } from 'react'
import '../Sass/Popup.scss'

interface Props {
  children: ReactNode
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup = ({ children, setShowPopup }: Props) => {
  return (
		<div className='overlay' onClick={() => { setShowPopup(false) }}>
			<div className='popup' onClick={(e) => { e.stopPropagation() }}>
			<FontAwesomeIcon className='close' icon={faClose} onClick={() => { setShowPopup(false) }}/>
			{children}
			</div>
			<div className='tfy-msg'>
				<p>Give Me a Beer es un juego basado en <a href='https://trivify.es/isla-misterio-para-bares.html'>Isla Misterio.</a> Un juego para bares.</p>
				</div>
		</div>
  )
}

export default Popup
