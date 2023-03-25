import { userStorage } from '../config'
import { getUserDataFromStorage } from '../logic/func'
import '../Sass/SkinBlock.scss'

interface Props {
  skinName: string
  playerSkin: string
  minLvl: number
  setPlayerSkin: React.Dispatch<React.SetStateAction<string>>
}

const SkinBlock = ({ skinName, setPlayerSkin, playerSkin, minLvl }: Props) => {
  const active = skinName === playerSkin && true
  const userData = getUserDataFromStorage()
  const userLvl = userData?.level

  const changeSkin = () => {
    if (!userLvl || userLvl < minLvl) return
    setPlayerSkin(skinName)
    userData.usingSkin = skinName
    localStorage.setItem(userStorage, JSON.stringify(userData))
  }

  return (
		<div className={active ? 'skin-block active' : 'skin-block'} onClick={changeSkin}>
			{userLvl && userLvl >= minLvl ? <img src={require(`../img/skins/player-${skinName}.png`)} alt='player' /> : <img src={require('../img/skins/player-unknown.png')} alt='player' />}
			{(userLvl && userLvl < minLvl) && <div className='min-level'>Nivel {minLvl}</div>}
		</div>
  )
}

export default SkinBlock
