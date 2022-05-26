import React, { useContext } from 'react'
import { TableContext } from '.'
import { TrWrap } from './index.style'
import Td from './td'

interface ITr {
  rowIndex: number
}

const Tr: React.FC<ITr> = (props: ITr) => {
  const { tableData } = useContext(TableContext)

  return (
    <TrWrap>
      <tr>
        {tableData[0] &&
          Array(tableData[0].length)
            .fill(null)
            .map((td, idx) => <Td key={idx} rowIndex={props.rowIndex} cellIndex={idx}></Td>)}
      </tr>
    </TrWrap>
  )
}

export default Tr
