import React, { Dispatch, memo, useMemo } from 'react'
import { TrWrap } from './index.style'
import Td from './td'

interface ITr {
  rowData: string[]
  rowIndex: number
  dispatch: Dispatch<any>
}

const Tr: React.FC<ITr> = (props: ITr) => {
  console.log('tr rendered')

  return (
    <TrWrap>
      <tr>
        {Array(props.rowData.length)
          .fill(null)
          .map(
            (td, idx) => (
              <Td rowIndex={props.rowIndex} cellIndex={idx} dispatch={props.dispatch} cellData={props.rowData[idx]}>
                {''}
              </Td>
            ),

            // component 사이에 있는 데이터는 children이라고 한다.
          )}
      </tr>
    </TrWrap>
  )
}

export default Tr
