import React, { useContext } from 'react'
import { TableContext } from './index'
import { TrWrap } from './index.style'
import Td from './td'

interface ITr {
  rowIndex: number
}

const Tr: React.FC<ITr> = (props: ITr) => {
  // Context API를 사용하면 하위 자손에게 프롭 드릴링 없이 바로 데이터를 전달할 수 있다.
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
