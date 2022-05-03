import React, { useCallback, useRef, useState } from 'react'
import Button from '../../components/button'
import { FlexBox, Title } from '../../styles/common.style'
import { TryInfo } from '../../Types/types'
import { NumericalBaseballContainer, Result, Tries, TryNumber } from './index.style'
import Try from './try'

// import { WordGameContainer } from './index.style'

interface INumericalBaseball {}

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const array = []
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * 9 - i), 1)[0]
    array.push(chosen)
  }
  return array
}

const NumericalBaseball: React.FC<INumericalBaseball> = (props: INumericalBaseball) => {
  const [answer, setAnswer] = useState(getNumbers())
  const [value, setValue] = useState('')
  const [result, setResult] = useState('숫자 4개를 입력해 게임을 시작하세요.')
  const [tries, setTries] = useState<TryInfo[]>([])
  const inputElement = useRef<HTMLInputElement>(null)

  const onSubmitHandler = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault()
      const input = inputElement.current
      if (value === answer.join('')) {
        setTries((it) => [
          ...it,
          {
            try: value,
            result: '⚾️ 홈런! 🥳',
          },
        ])
        setResult('⚾️ 홈런! 🥳')
        alert('⚾️ 홈런!🥳 게임을 다시 실행합니다.')
        setValue('')
        setAnswer(getNumbers())
        setTries([])
        if (input) {
          input.focus()
        }
      } else {
        const answerArray = value.split('').map((v) => parseInt(v))
        let strike = 0
        let ball = 0
        if (tries.length >= 9) {
          setResult(`😭 10회 안에 답을 맞추지 못해 실패했습니다. 정답은 ${answer.join(',')}였습니다!`) // state set은 비동기
          alert('실패 😭 게임을 다시 시작합니다.')
          setValue('')
          setAnswer(getNumbers())
          setTries([])
          if (input) {
            input.focus()
          }
        } else {
          console.log('답은', answer.join(''))
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log('strike', answerArray[i], answer[i])
              strike += 1
            } else if (answer.includes(answerArray[i])) {
              console.log('ball', answerArray[i], answer.indexOf(answerArray[i]))
              ball += 1
            }
          }
          setTries((it) => [
            ...it,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ])
          setValue('')
          if (input) {
            input.focus()
          }
        }
      }
    },
    [value, answer],
  )

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  return (
    <NumericalBaseballContainer>
      <Title>숫자 야구</Title>
      <FlexBox>
        <Result>{result}</Result>
      </FlexBox>
      <form onSubmit={onSubmitHandler}>
        <input //
          ref={inputElement}
          maxLength={4}
          value={value}
          onChange={onChangeHandler}
        />
        <Button onClick={() => {}} text={'입력'} type={'positive'} />
      </form>
      <TryNumber>시도: {tries.length}</TryNumber>
      <Tries>
        {tries.map((value, idx) => (
          <Try key={`${idx + 1}차 시도 : ${value.try}`} tryInfo={value} />
        ))}
      </Tries>
    </NumericalBaseballContainer>
  )
}

export default NumericalBaseball
