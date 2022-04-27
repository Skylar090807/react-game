import React, { useRef, useState } from 'react'
import { MultiplicationTableContainer, Numbers, Result } from './index.style'
import { Title } from '../../styles/common.style'

interface IMultiplicationTable {}

const MultiplicationTable: React.FC<IMultiplicationTable> = (props: IMultiplicationTable) => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  /* form tag의 onSubmit과 같이 속성을 함수로 분리하지 않고 바로 작성하면
     type을 지정하지 않아도 type 추론이 된다. 그러나 함수로 분리하면 
     타입 추론이 되지 않으므로 argument의 type을 명시해줘야 한다.
  */
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputRef.current
    if (Number(value) === first * second) {
      setResult('정답입니다! 🥳')
      setFirst(Math.ceil(Math.random() * 9))
      setSecond(Math.ceil(Math.random() * 9))
      setValue('')
      if (input) {
        input.focus()
      }
    } else {
      setResult('틀렸습니다! 😭')
      setValue('')
      if (input) {
        input.focus()
      }
    }
  }

  const onChangeHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
  }

  return (
    <MultiplicationTableContainer>
      <Title>구구단 게임</Title>
      <Numbers>
        {first} X {second} = ?
      </Numbers>
      <form onSubmit={onSubmitFormHandler}>
        <input //
          type="number"
          ref={inputRef}
          value={value}
          onChange={onChangeHandler}
        />
      </form>
      <Result>{result}</Result>
    </MultiplicationTableContainer>
  )
}

export default MultiplicationTable
