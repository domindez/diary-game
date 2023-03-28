import { useState } from 'react'
import bolt from '../img/bolt.svg'
import boltActive from '../img/bolt-active.svg'
import '../Sass/PowerBar.scss'
import { type UserData } from '../logic/interfaces'

interface Props {
  user: UserData | null
}

const PowerBar = ({ user }: Props) => {
  if (!user) return <></>
  const [powerLvl] = useState(user.statistics.gamesWonInARow)

  return (
    <div className='power-bar'>
      {/* <FontAwesomeIcon className={powerLvl > 0 ? 'bolt powered' : 'bolt' } icon={faBolt}/> */}
			<img src={powerLvl > 0 ? boltActive : bolt} className='bolt' alt='bolt' />
			<img src={powerLvl > 1 ? boltActive : bolt} className='bolt' alt='bolt' />
			<img src={powerLvl > 2 ? boltActive : bolt} className='bolt' alt='bolt' />
			<img src={powerLvl > 3 ? boltActive : bolt} className='bolt' alt='bolt' />
			<img src={powerLvl > 4 ? boltActive : bolt} className='bolt' alt='bolt' />
    </div>
  )
}

export default PowerBar
