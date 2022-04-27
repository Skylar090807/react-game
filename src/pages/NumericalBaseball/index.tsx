import React, { Fragment } from 'react'
import { Title } from '../../styles/common.style'

// import { WordGameContainer } from './index.style'

interface INumericalBaseball {}

const NumericalBaseball: React.FC<INumericalBaseball> = (props: INumericalBaseball) => {
  return (
    <>
      <Title>숫자 야구</Title>
      숫자 야구
    </>
  )
}

export default NumericalBaseball
