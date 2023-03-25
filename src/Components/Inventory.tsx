import { getUserDataFromStorage } from '../logic/func'
import '../Sass/Inventory.scss'
import Popup from './Popup'
import SkinBlock from './SkinBlock'

interface Props {
  setShowInventory: React.Dispatch<React.SetStateAction<boolean>>
  setPlayerSkin: React.Dispatch<React.SetStateAction<string>>
  playerSkin: string
}

const Inventory = ({ setShowInventory, setPlayerSkin, playerSkin }: Props) => {
  const userData = getUserDataFromStorage()

  return (
		<Popup setShowPopup={setShowInventory} >
			<div className='inventory'>
				<h3>Tus personajes</h3>
				<p>Nivel: <span className='lvl-number'>{userData?.level}</span></p>
				<div className='inventory-grid'>
					<SkinBlock skinName='pirate' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='zombi' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='virus' minLvl={5} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='bear' minLvl={10} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={15} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='couple' minLvl={20} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='fatman' minLvl={25} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='redhair' minLvl={30} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='blackman' minLvl={35} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='ufo' minLvl={40} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='sausage' minLvl={45} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='et' minLvl={90} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
				</div>
			</div>
		</Popup>
  )
}

export default Inventory
