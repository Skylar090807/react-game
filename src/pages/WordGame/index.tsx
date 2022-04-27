import React, { Fragment } from 'react'
import { Title } from '../../styles/common.style'

import { WordGameContainer } from './index.style'

interface IWordGame {}

const WordGame: React.FC<IWordGame> = (props: IWordGame) => {
  return (
    <WordGameContainer>
      <Title>끝말잇기</Title>
      끝말잇기
    </WordGameContainer>
  )
}

export default WordGame
