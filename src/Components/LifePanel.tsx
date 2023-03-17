import React from 'react'

interface Props {
  stops: number
  userBottles: number
}

const LifePanel = ({ stops, userBottles }: Props) => {
  return (
		<div>
      stops = {stops}
		</div>
  )
}

export default LifePanel
