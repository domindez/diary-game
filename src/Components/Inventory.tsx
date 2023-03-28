import { type UserData } from '../logic/interfaces'
import '../Sass/Inventory.scss'
import Popup from './Popup'
import SkinBlock from './SkinBlock'

interface Props {
  setShowInventory: React.Dispatch<React.SetStateAction<boolean>>
  setPlayerSkin: React.Dispatch<React.SetStateAction<string>>
  playerSkin: string
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
  user: UserData | null
}

const Inventory = ({ setShowInventory, setPlayerSkin, playerSkin, user, setUser }: Props) => {
  return (
		<Popup setShowPopup={setShowInventory} >
			<div className='inventory'>
				<h3>Tus personajes</h3>
				<p>Nivel: <span className='lvl-number'>{user?.level}</span></p>
				<div className='inventory-grid'>
					<SkinBlock skinName='pirate' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='zombi' minLvl={0} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='virus' minLvl={5} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='bear' minLvl={10} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='einstein' minLvl={15} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='couple' minLvl={20} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='fatman' minLvl={25} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='redhair' minLvl={30} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='blackman' minLvl={35} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='ufo' minLvl={40} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='sausage' minLvl={45} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
					<SkinBlock skinName='et' minLvl={90} setPlayerSkin={setPlayerSkin} playerSkin={playerSkin} user={user} setUser={setUser}/>
				</div>
			</div>
		</Popup>
  )
}

export default Inventory
