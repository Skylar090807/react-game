import * as React from 'react'
import { useEffect, useReducer, createContext, useMemo, Dispatch } from 'react'
import Form from './form'
import Table from './table'
import {
  ReducerActions,
  START_GAME,
  OPEN_CELL,
  INCREMENT_TIMER,
  NORMALIZE_CELL,
  QUESTION_CELL,
  FLAG_CELL,
  CLICK_MINE,
} from './action'
import { MinesweeperContainer, MinesweeperWrap, Timer } from './index.style'
import { Title } from '../../styles/common.style'

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
} as const //as const를 해주지 않으면 value가 number로 광범위하게 들어간다.

// 반복해서 쓰이는 코드 type alias로 중복 제거.
export type Codes = typeof CODE[keyof typeof CODE]
interface Context {
  tableData: Codes[][]
  halted: boolean
  dispatch: Dispatch<ReducerActions>
}

export const TableContext = createContext<Context>({
  tableData: [],
  halted: true,
  dispatch: () => {},
})

interface ReducerState {
  tableData: Codes[][]
  data: {
    row: number
    cell: number
    mine: number
  }
  timer: number
  result: string
  halted: boolean
  // row * cell - mine 값이 openedCount 값과 같다면 승리한 것.
  openedCount: number
}

const initialState: ReducerState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true, //halted:true면 중지 상태
  openedCount: 0,
}

// 지뢰를 심어주는 함수
const plantMine = (row: number, cell: number, mine: number): Codes[][] => {
  // row와 cell을 곱해 칸을 만든다. 예) row: 10, cell:10 이라면 100칸.
  const candidate = Array(row * cell)
    .fill(undefined)
    .map((arr, i) => {
      return i
    })

  //지뢰의 갯수 만큼 랜덤한 숫자를 뽑아 shuffle에 담아준다. 지뢰가 담길 칸의 번호가 랜덤하게 생성된다.
  const shuffle = []
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }

  // 이차원 배열로 테이블 데이터를 만들어준다. 정상적인 칸.
  const data: Codes[][] = []
  for (let i = 0; i < row; i++) {
    const rowData: Codes[] = []
    data.push(rowData)
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL)
    }
  }

  // 지뢰 담길 칸을 뽑아온 shuffle을 이용해 지뢰를 심어준다.
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell)
    const hor = shuffle[k] % cell
    data[ver][hor] = CODE.MINE
  }

  console.log(data)
  return data
}

// reducer 함수 구현
const reducer = (state = initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      }

    case OPEN_CELL: {
      const tableData = [...state.tableData]
      tableData.forEach((row, i) => {
        tableData[i] = [...row]
      })
      const checked: string[] = []
      let openedCount = 0
      const checkAround = (row: number, cell: number) => {
        console.log(row, cell)
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return
        } // 상하좌우 없는칸은 안 열기
        if (
          ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION] as Codes[]).includes(
            tableData[row][cell],
          )
        ) {
          return
        } // 닫힌 칸만 열기
        if (checked.includes(row + '/' + cell)) {
          return
        } else {
          checked.push(row + '/' + cell)
        } // 한 번 연칸은 무시하기
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]]
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]])
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]])
        }
        const count = around.filter(function (v) {
          // type을 엄격하게 선언하고 나면 includes를 사용할 때 면밀하게 검사하기 때문에 as를 사용하여 type을 맞춰주는 것이 편리하다.
          return ([CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE] as Codes[]).includes(v)
        }).length as Codes
        if (count === 0) {
          // 주변칸 오픈
          if (row > -1) {
            const near = []
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1])
              near.push([row - 1, cell])
              near.push([row - 1, cell + 1])
            }
            near.push([row, cell - 1])
            near.push([row, cell + 1])
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1])
              near.push([row + 1, cell])
              near.push([row + 1, cell + 1])
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1])
              }
            })
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1
        }
        tableData[row][cell] = count
      }
      checkAround(action.row, action.cell)
      let halted = false
      let result = ''
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount)
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        // 승리
        halted = true
        result = `${state.timer}초만에 승리하셨습니다`
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.cell] = CODE.CLICKED_MINE
      return {
        ...state,
        tableData,
        halted: true,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      } else {
        tableData[action.row][action.cell] = CODE.FLAG
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL
      }
      return {
        ...state,
        tableData,
      }
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tableData, halted, timer, result } = state

  // Context API를 사용할 때 Provider로 자식 컴포넌트에게 모두 value를 전달하므로 성능에 좋지 않다. 때문에 useMemo를 사용하여 캐싱해주는 것이 좋다.
  // useMemo deps에 tableData와 halted를 dependency로 전달하면, tableData와 halted 값이 변경 될 때만 렌더된다.
  // reducer 함수 dispatch는 변경되는 값 없이 항상 똑같이 유지되므로 dependency로 전달 할 필요 없다.
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted])

  useEffect(() => {
    let timer: number
    if (halted === false) {
      timer = window.setInterval(() => {
        dispatch({ type: INCREMENT_TIMER })
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [halted])
  return (
    <TableContext.Provider value={value}>
      <MinesweeperContainer>
        <Title>지뢰찾기</Title>
        <MinesweeperWrap>
          <Form />
          <Timer>🕰 : {timer}</Timer>
          <Table />
          <div>{result}</div>
        </MinesweeperWrap>
      </MinesweeperContainer>
    </TableContext.Provider>
  )
}

export default MineSearch
