import { Divider } from 'antd'
import * as React from 'react'
import { BallContainer, LottoBalls } from './index.style'

interface IBall {
  number: number
  ballColor?: string
}

const Ball: React.FC<IBall> = (props: IBall) => {
  const number = props.number
  let ballColor = props.ballColor

  if (number <= 10) {
    ballColor = 'red'
  } else if (number <= 20) {
    ballColor = 'orange'
  } else if (number <= 30) {
    ballColor = 'purple'
  } else if (number <= 40) {
    ballColor = 'blue'
  } else {
    ballColor = 'green'
  }
  return (
    <BallContainer>
      <LottoBalls style={{ background: `${ballColor}` }}>{number}</LottoBalls>
    </BallContainer>
  )
}

export default Ball
