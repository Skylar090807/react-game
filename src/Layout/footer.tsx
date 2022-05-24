import React from 'react'
import { FooterContainer, FooterTextWrap, FooterWrap, LogoImgWrap } from './layout.style'
import logo from '../assets/game_logo.jpeg'
import { Link } from 'react-router-dom'

interface IFooter {}

const Footer: React.FC<IFooter> = (props: IFooter) => {
  return (
    <FooterContainer>
      <FooterWrap>
        <LogoImgWrap>
          <Link to="/">
            <img className="logo-img" src={logo} alt="logo" />
          </Link>
        </LogoImgWrap>
        <FooterTextWrap>
          <div>React-Game for Redux & MobX Study.</div>
          <div>Copyright &copy; 2022 Skylar all rights reserved.</div>
        </FooterTextWrap>
      </FooterWrap>
    </FooterContainer>
  )
}

export default Footer
