import React, { useContext } from 'react'
import { TableContext } from '.'
import { TableWrap } from './index.style'
import Tr from './tr'

interface ITable {}

const Table: React.FC<ITable> = (props: ITable) => {
  const { tableData } = useContext(TableContext)

  return (
    <TableWrap>
      <table>
        {Array(tableData.length)
          .fill(null)
          .map((tr, idx) => (
            <Tr key={idx} rowIndex={idx}></Tr>
          ))}
      </table>
    </TableWrap>
  )
}

export default Table
