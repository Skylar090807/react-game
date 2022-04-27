import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/button'
import { Title } from '../../styles/common.style'
import Ball from './ball'
import { LottoContainer } from './index.style'

interface ILotto {}

const getWonNumbers = () => {
  const candidate = Array(45)
    .fill(null)
    .map((value, idx) => idx + 1)
  const shuffle = []
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
  }
  const bonusNumber = shuffle[shuffle.length - 1]
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
  return [...winNumbers, bonusNumber]
}

const Lotto: React.FC<ILotto> = (props: ILotto) => {
  const lottoNumber = useMemo(() => getWonNumbers(), [])
  const [winNumbers, setWinNumbers] = useState(lottoNumber)
  const [winBalls, setWinBalls] = useState<number[]>([])
  const [bonus, setBonus] = useState<number | null>(null)
  const [redo, setRedo] = useState<Boolean>(false)
  const timeouts = useRef<number[]>([])

  useEffect(() => {
    for (let i = 0; winNumbers.length - 1 > i; i++) {
      timeouts.current[i] = window.setTimeout(() => {
        setWinBalls((preBalls) => [...preBalls, winNumbers[i]])
      }, (i + 1) * 1000)
    }
    timeouts.current[6] = window.setTimeout(() => {
      setBonus(winNumbers[6])
      setRedo(true)
    }, 7000)
    return () => {
      timeouts.current.forEach((value) => {
        clearTimeout(value)
      })
    }
  }, [timeouts.current])

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWonNumbers())
    setWinBalls([])
    setBonus(null)
    setRedo(false)
    timeouts.current = []
  }, [winNumbers])

  return (
    <LottoContainer>
      <Title>로또번호 추천</Title>
      <div>오늘의 로또번호는!</div>
      <div id="result">
        {winBalls.map((it) => (
          <Ball key={it} number={it} />
        ))}
      </div>
      <div>Bonus!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <Button onClick={onClickRedo} text={'한 번 더 해볼까요?'} type={'positive'} />}
    </LottoContainer>
  )
}

export default Lotto
