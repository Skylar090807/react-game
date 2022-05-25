import React, { Dispatch, memo } from 'react'
import { useCallback } from 'react'
import { CLICK_CELL } from '.'
import { TdWrap } from './index.style'

interface ITd {
  rowIndex: number
  cellIndex: number
  dispatch: Dispatch<any>
  cellData: string
  children: string //<Td>{''}</Td> Td 컴포넌트 사이의 중괄호 빈 문자열로 되어있는 데이터를 children이라고 한다.
}

const Td: React.FC<ITd> = (props: ITd) => {
  console.log('td rendered')

  const onClickTd = useCallback(() => {
    console.log(props.rowIndex, props.cellIndex)
    if (props.cellData) {
      return
    }
    props.dispatch({ type: CLICK_CELL, row: props.rowIndex, cell: props.cellIndex })
  }, [props.cellData])

  return (
    <TdWrap>
      <td onClick={onClickTd}>{props.cellData}</td>
    </TdWrap>
  )
}

export default Td
