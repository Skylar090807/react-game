import React, { useCallback, useRef, useState } from 'react'
import Button from '../../components/button'
import { Title } from '../../styles/common.style'

import { Word, WordGameContainer, WordGameResult, WordGameWrap } from './index.style'

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
        setResult('통과!')
        setWord(value)
        setValue('')
        if (input) {
          input.focus()
        }
      } else {
        setResult('주어진 단어의 끝 글자와 시작할 단어의 첫 글자가 같아야 합니다.')
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
      <WordGameWrap>
        <Word>{word}</Word>
        <form onSubmit={onSubmitFormHandler}>
          <input //
            type="text"
            ref={inputRef}
            onChange={onChangeHandler}
            placeholder="다람쥐"
          />
          <Button onClick={() => {}} text={'입력'} type={'positive'} />
        </form>
        <WordGameResult>{result}</WordGameResult>
      </WordGameWrap>
    </WordGameContainer>
  )
}

export default WordGame
