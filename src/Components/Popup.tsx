import { type ReactNode } from 'react'
import '../Sass/Popup.scss'

interface Props {
  children: ReactNode
}
const Popup = ({ children }: Props) => {
  return (
		<div className='overlay'>
			<div className='popup'>
			{children}
			</div>
			<div className='tfy-msg'>
				<p>Give Me a Beer es un juego basado en <a href='https://trivify.es/isla-misterio-para-bares.html'>Isla Misterio.</a> Un juego para llenar tu bar.</p>
				</div>
		</div>
  )
}

export default Popup
