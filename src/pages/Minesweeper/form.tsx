import React, { memo, useCallback, useContext, useState } from 'react'
import { TableContext } from '.'
import Button from '../../components/button'
import { startGame } from './action'
import { FormWrap } from './index.style'

const Form = () => {
  const [row, setRow] = useState(10)
  const [cell, setcell] = useState(10)
  const [mine, setMine] = useState(20)

  const { dispatch } = useContext(TableContext)

  // 컴포넌트 안에서 event handler로 전달되는 함수는 useCallback을 사용해 쓸 데 없는 re-render를 막는 것이 좋다.
  const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // setRow는 string인데 number type이 들어갔기 때문에 error가 발생한다.
    // Number()를 활용해 형변환 해주면 된다.
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
      <input type="number" placeholder="가로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="세로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <Button onClick={onClickBtn} text={'시작'} type={'positive'} />
    </FormWrap>
  )
}

export default memo(Form)
