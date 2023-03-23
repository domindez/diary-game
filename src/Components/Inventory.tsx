import '../Sass/Inventory.scss'
import Popup from './Popup'
import SkinBlock from './SkinBlock'

interface Props {
  setShowInventory: React.Dispatch<React.SetStateAction<boolean>>
  setPlayerSkin: React.Dispatch<React.SetStateAction<string>>
  playerSkin: string
}

const Inventory = ({ setShowInventory, setPlayerSkin, playerSkin }: Props) => {
  return (
		<Popup setShowPopup={setShowInventory} >
			<div className='inventory'>
				<h3>Tus personajes</h3>
				<div className='inventory-grid'>
					<SkinBlock skinName='pirate' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='zombi' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='bear' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={5} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={15} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={20} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={25} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={30} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
					<SkinBlock skinName='einstein' minLvl={35} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin}/>
				</div>
			</div>
		</Popup>
  )
}

export default Inventory
