import React, { useRef, useState } from 'react'
import { MultiplicationTableContainer, Numbers, Result } from './index.style'
import { Title } from '../../styles/common.style'

interface IMultiplicationTable {}

const MultiplicationTable: React.FC<IMultiplicationTable> = (props: IMultiplicationTable) => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputElements = useRef<HTMLInputElement>(null)

  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputElements.current
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
          ref={inputElements}
          value={value}
          onChange={onChangeHandler}
        />
      </form>
      <Result>{result}</Result>
    </MultiplicationTableContainer>
  )
}

export default MultiplicationTable
