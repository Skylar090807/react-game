import React, { useCallback, useContext, useState } from 'react'
import { TableContext } from '.'
import Button from '../../components/button'
import { startGame } from './action'
import { FormWrap } from './index.style'

const Form = () => {
  const [row, setRow] = useState(10)
  const [cell, setcell] = useState(10)
  const [mine, setMine] = useState(20)
  const { dispatch } = useContext(TableContext)

  const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value))
  }, [])

  const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setcell(Number(e.target.value))
  }, [])

  const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMine(Number(e.target.value))
  }, [])

  const onClickBtn = useCallback(() => {
    dispatch(startGame(row, cell, mine))
  }, [row, cell, mine])

  return (
    <FormWrap>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <Button onClick={onClickBtn} text={'시작'} type={'positive'} />
    </FormWrap>
  )
}

export default Form
