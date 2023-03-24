
interface Props {
  name: string
  value: number
}

const StatisticsBlock = ({ name, value }: Props) => {
  return (
		<div className='statistics-block'>
			<p className='name'>{name}:</p><p className='number'>{value}</p>
		</div>
  )
}

export default StatisticsBlock
