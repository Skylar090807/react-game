import styled from 'styled-components'

// index.tsx
export const TicTacToeContainer = styled.div``
export const TicTacToeWrap = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
`

export const TicTacToeResult = styled.div`
  margin: 2em;
  font-size: 2em;
`

// table.tsx
export const TableWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.21);
  table {
    border-collapse: collapse;
    display: flex;
  }
`
// tr.tsx
export const TrWrap = styled.div`
  background: ;
`

// td.tsx
export const TdWrap = styled.div`
  td {
    border: 5px solid lightblue;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
`
