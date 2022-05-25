import React, { Fragment, Reducer, useCallback, useEffect, useReducer } from 'react'
import { Title } from '../../styles/common.style'
import { TicTacToeContainer, TicTacToeWrap } from './index.style'
import Table from './table'

// Redux에도 ReducerState가 있다. 혼동할 수 있으니 사용하지 않는 것이 좋다.
interface ReducerState {
  winner: 'O' | 'X' | ''
  turn: 'O' | 'X'
  tableData: string[][]
  recentCell: [number, number]
}

const initialState: ReducerState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
}

// action의 이름들은 대문자로 선언한다.
export const SET_WINNER = 'SET_WINNER' as const
export const CLICK_CELL = 'CLICK_CELL' as const
export const CHANGE_TURN = 'CHANGE_TURN' as const
export const RESET_GAME = 'RESET_GAME' as const

interface SetWinnerAction {
  type: typeof SET_WINNER
  winner: 'O' | 'X'
}

const setWinner = (winner: 'O' | 'X'): SetWinnerAction => {
  return { type: SET_WINNER, winner }
}

interface ClickCellAction {
  type: typeof CLICK_CELL
  row: number
  cell: number
}

const clickCell = (row: number, cell: number): ClickCellAction => {
  return { type: CLICK_CELL, row, cell }
}

interface ChangeTurnAction {
  type: typeof CHANGE_TURN
}

interface ResetGameAction {
  type: typeof RESET_GAME
}

type ReducerActions = SetWinnerAction | ClickCellAction | ChangeTurnAction | ResetGameAction
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner 이렇게 하면 error
      return {
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...tableData[action.row]] //immer 라이브러리로 가독성 해결할 예정
      tableData[action.row][action.cell] = state.turn
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      }
    }
    default:
      return state
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer<Reducer<ReducerState, ReducerActions>>(reducer, initialState)
  const { tableData, turn, winner, recentCell } = state
  // const [winner, setWinner] = useState('')
  // const [turn, setTurn] = useState('O')
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  // 컴포넌트 이벤트에 넣는 함수들은 useCallback해준다.
  const onClickTable = useCallback(() => {
    dispatch(setWinner('O'))
  }, [])

  useEffect(() => {
    const [row, cell] = recentCell
    if (row < 0) {
      return
    }
    let win = false
    // 가로
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true
    }
    console.log(win, row, cell, tableData, turn)
    if (win) {
      //승리했을 때
      dispatch({ type: SET_WINNER, winner: turn })
      dispatch({ type: RESET_GAME })
    } else {
      let all = true //all = true면 무승부
      tableData.forEach((row) => {
        // 무승부 체크
        row.forEach((cell) => {
          if (!cell) {
            all = false
          }
        })
      })
      if (all) {
        dispatch({ type: RESET_GAME })
      } else {
        dispatch({ type: CHANGE_TURN })
      }
    }
  }, [recentCell])

  return (
    <TicTacToeContainer>
      <Title>틱택토</Title>
      <TicTacToeWrap>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
        {winner && <div>{winner}님의 승리</div>}
      </TicTacToeWrap>
    </TicTacToeContainer>
  )
}

export default TicTacToe
