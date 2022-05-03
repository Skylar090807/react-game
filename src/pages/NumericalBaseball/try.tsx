import React from 'react'
import { FlexBox } from '../../styles/common.style'
import { TryInfo } from '../../Types/types'
import { TryInfoResult, TryInfoTry, TryInfoWrapper } from './index.style'

const Try: React.FC<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  return (
    <FlexBox>
      <TryInfoWrapper>
        <TryInfoTry>{tryInfo.try}</TryInfoTry>
        <TryInfoResult>{tryInfo.result}</TryInfoResult>
      </TryInfoWrapper>
    </FlexBox>
  )
}

export default Try
