import React from 'react'
import { FooterContainer, FooterWrap } from './layout.style'

interface IFooter {}

const Footer: React.FC<IFooter> = (props: IFooter) => {
  return (
    <FooterContainer>
      <FooterWrap>Footer</FooterWrap>
    </FooterContainer>
  )
}

export default Footer
