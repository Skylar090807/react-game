import styled from 'styled-components'

// index.tsx
export const MinesweeperContainer = styled.div``
export const MinesweeperWrap = styled.div``
export const Timer = styled.div`
  font-size: 2em;
  margin-top: 20px;
  margin-bottom: 100px;
`

// table.tsx
export const TableWrap = styled.div`
  table {
    border-collapse: collapse;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

// tr.tsx
export const TrWrap = styled.div`
  tr {
  }
`

// td.tsx
export const TdWrap = styled.div`
  td {
    // border: 1px solid #000;
    width: 80px;
    heigt: 80px;
    text-align: center;
    line-height: 80px;
  }
`
// form.tsx
export const FormWrap = styled.div`
  margin-bottom: 20px;
  input {
    border: none;
    padding: 12px;
    border-radius: 7px;
    outline: none;
    background: #e2e2e2;
    margin-right: 5px;
    font-size: 1.1em;
    text-align: center;
  }

  button {
    padding: 15px 20px;
  }
`
