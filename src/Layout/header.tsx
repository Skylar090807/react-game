import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './navigation'
import logo from '../assets/game_logo.jpeg'
import { HeaderContainer } from './layout.style'

interface IHeader {}

const Header: React.FC<IHeader> = (props: IHeader) => {
  return (
    <HeaderContainer>
      <Link to="/">
        <img className="logo" src={logo} alt="퍼플시드 로고" />
      </Link>
      <Navigation />
    </HeaderContainer>
  )
}

export default Header
