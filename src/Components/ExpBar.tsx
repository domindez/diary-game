import '../Sass/ExpBar.scss'

interface Props {
  exp: number
}

const ExpBar = ({ exp }: Props) => {
  const progress = (exp)

  return (
		<div className='exp-bar'>
			<div className='filler' style={{ width: `${progress}%` }}>
      </div>
        <p className='label'>{exp} / 100 <img src={require('../img/lives.png')} alt='lives'/></p>
		</div>
  )
}

export default ExpBar
