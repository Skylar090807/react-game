import React, { Dispatch, useCallback, useMemo } from 'react'
import { TableWrap } from './index.style'
import Tr from './tr'

interface ITable {
  tableData: string[][]
  dispatch: Dispatch<any> //좀 더 엄격하게 하려면 any 대신 index.tsx의 ReducerActionse를 명시해주는 것이 좋다.
  onClick: () => void
}

const Table: React.FC<ITable> = (props: ITable) => {
  return (
    <TableWrap>
      <table>
        {Array(props.tableData.length)
          .fill(null)
          .map((tr, idx) => (
            <Tr key={idx} dispatch={props.dispatch} rowIndex={idx} rowData={props.tableData[idx]} />
          ))}
      </table>
    </TableWrap>
  )
}

export default Table
