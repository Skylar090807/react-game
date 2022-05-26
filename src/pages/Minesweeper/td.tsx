import React, { Fragment, memo, useCallback, useContext } from 'react'
import { TableContext, CODE, Codes } from './index'
import { openCell, clickMine, questionCell, flagMine, normalizeCell } from './action'
import { TdWrap } from './index.style'

const getTdStyle = (code: Codes) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: '#fff',
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'lightblue',
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'lightpink',
      }
    default:
      return {
        background: '#fff',
      }
  }
}

const getTdText = (code: Codes) => {
  console.log('getTdText')

  switch (code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return 'X'
    case CODE.CLICKED_MINE:
      return '💣'
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '🚩'
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?'
    default:
      return code || ''
  }
}

interface ITd {
  rowIndex: number
  cellIndex: number
}

const Td: React.FC<ITd> = (props: ITd) => {
  const { tableData, dispatch, halted } = useContext(TableContext)

  const onClickTd = useCallback(() => {
    if (halted) {
      return
    }
    switch (tableData[props.rowIndex][props.cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return
      case CODE.NORMAL:
        dispatch(openCell(props.rowIndex, props.cellIndex))
        return
      case CODE.MINE:
        dispatch(clickMine(props.cellIndex, props.cellIndex))
        return
      default:
        return
    }
  }, [tableData[props.rowIndex][props.cellIndex], halted])

  const onRightClickTd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      if (halted) {
        return
      }
      switch (tableData[props.rowIndex][props.cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch(flagMine(props.rowIndex, props.cellIndex))
          return
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch(questionCell(props.rowIndex, props.cellIndex))
          return
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch(normalizeCell(props.rowIndex, props.cellIndex))
          return
        default:
          return
      }
    },
    [tableData[props.rowIndex][props.cellIndex], halted],
  )
  return (
    <Fragment>
      <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[props.rowIndex][props.cellIndex]} />
    </Fragment>
  )
}

interface IRealTd {
  onClickTd: () => void
  onRightClickTd: (e: React.MouseEvent) => void
  data: Codes
}

const RealTd: React.FC<IRealTd> = memo((props: IRealTd) => {
  return (
    <TdWrap>
      <td //
        style={getTdStyle(props.data)}
        onClick={props.onClickTd}
        onContextMenu={props.onRightClickTd}
      >
        {getTdText(props.data)}
      </td>
    </TdWrap>
  )
})

export default Td
