import React, { useCallback, useRef, useState } from 'react'
import Button from '../../components/button'
import { Title } from '../../styles/common.style'

import { WordGameContainer } from './index.style'

interface IWordGame {}

const WordGame: React.FC<IWordGame> = (props: IWordGame) => {
  const [word, setWord] = useState<string>('바다')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmitFormHandler = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault()
      const input = inputRef.current
      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕')
        setWord(value)
        setValue('')
        if (input) {
          input.focus()
        }
      } else {
        setResult('땡')
        setValue('')
        if (input) {
          input.focus()
        }
      }
    },
    [word, value],
  )

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  return (
    <WordGameContainer>
      <Title>끝말잇기</Title>
      <div>{word}</div>
      <form onSubmit={onSubmitFormHandler}>
        <input //
          type="text"
          // ref={''}
          onChange={onChangeHandler}
        />
        <Button onClick={() => {}} text={'입력'} type={'negative'} />
      </form>
      <div>{result}</div>
    </WordGameContainer>
  )
}

export default WordGame
