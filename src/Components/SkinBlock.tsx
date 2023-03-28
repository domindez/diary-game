import { type UserData } from '../logic/interfaces'
import '../Sass/SkinBlock.scss'

interface Props {
  skinName: string
  playerSkin: string
  minLvl: number
  user: UserData | null
  setPlayerSkin: React.Dispatch<React.SetStateAction<string>>
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}

const SkinBlock = ({ skinName, setPlayerSkin, playerSkin, minLvl, user, setUser }: Props) => {
  if (!user) return <></>
  const userData = { ...user }
  const active = skinName === playerSkin && true
  const userLvl = userData?.level

  const changeSkin = () => {
    if (!userLvl || userLvl < minLvl) return
    setPlayerSkin(skinName)
    userData.usingSkin = skinName
    setUser(userData)
  }

  return (
		<div className={active ? 'skin-block active' : 'skin-block'} onClick={changeSkin}>
			{userLvl && userLvl >= minLvl ? <img src={require(`../img/skins/player-${skinName}.png`)} alt='player' /> : <img src={require('../img/skins/player-unknown.png')} alt='player' />}
			{(userLvl && userLvl < minLvl) && <div className='min-level'>Nivel {minLvl}</div>}
		</div>
  )
}

export default SkinBlock
