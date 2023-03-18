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
		</div>
  )
}

export default Popup
