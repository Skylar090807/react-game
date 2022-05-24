import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/button'
import { Title } from '../../styles/common.style'
import { Buttons, ButtonWrapper, ImgWrapper, RockParperScissorsContainer, RPSResult, RPSScore } from './index.style'
import rpsImg from '../../assets/rpsImg.jpeg'

interface IRockPaperScissors {}

const rpsCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
} as const

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
} as const

type ImgCoords = typeof rpsCoords[keyof typeof rpsCoords]
const computerChoice = (imgCoords: ImgCoords) => {
  return (Object.keys(rpsCoords) as ['바위', '가위', '보']).find((k) => {
    return rpsCoords[k] === imgCoords
  })!
}

const RockPaperScissors: React.FC<IRockPaperScissors> = (props: IRockPaperScissors) => {
  const [result, setResult] = useState('')
  const [imgCoord, setImgCoord] = useState<ImgCoords>(rpsCoords.바위)
  const [score, setScore] = useState(0)
  const interval = useRef<number>()

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    console.log('다시 실행')
    interval.current = window.setInterval(changeHand, 100)
    return () => {
      // componentWillUnmount 역할
      console.log('종료')
      clearInterval(interval.current)
    }
  }, [imgCoord])

  const changeHand = () => {
    if (imgCoord === rpsCoords.바위) {
      setImgCoord(rpsCoords.가위)
    } else if (imgCoord === rpsCoords.가위) {
      setImgCoord(rpsCoords.보)
    } else if (imgCoord === rpsCoords.보) {
      setImgCoord(rpsCoords.바위)
    }
  }

  const onClickBtn = (choice: keyof typeof rpsCoords) => () => {
    clearInterval(interval.current)
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore
    if (diff === 0) {
      setResult('비겼습니다.')
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다')
      setScore((preScore) => preScore + 1)
    } else {
      setResult('졌습니다.')
      setScore((preScore) => preScore - 1)
    }
    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100)
    }, 1000)
  }

  return (
    <RockParperScissorsContainer>
      <Title>가위바위보</Title>
      {/* <div
        id="computer"
        style={{ backgroundImage: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      > */}
      <ImgWrapper>
        <img src={rpsImg} alt="" />
      </ImgWrapper>
      <ButtonWrapper>
        <Buttons>
          <Button onClick={onClickBtn('가위')} text={'가위'} type={'positive'} />
        </Buttons>
        <Buttons>
          <Button onClick={onClickBtn('바위')} text={'바위'} type={'positive'} />
        </Buttons>
        <Buttons>
          <Button onClick={onClickBtn('보')} text={'보'} type={'positive'} />
        </Buttons>
      </ButtonWrapper>
      <RPSResult>{result}</RPSResult>
      <RPSScore>현재 Score: {score}</RPSScore>
    </RockParperScissorsContainer>
  )
}

export default RockPaperScissors
