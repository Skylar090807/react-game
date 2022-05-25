import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavigationContainer } from './layout.style'

interface INavigation {}

const Navigation: React.FC<INavigation> = (props: INavigation) => {
  return (
    <NavigationContainer>
      <NavLink to="/multiplicationTable" className={({ isActive }) => (isActive ? 'selected' : '')}>
        구구단 게임 💯
      </NavLink>
      <NavLink to="/lotto" className={({ isActive }) => (isActive ? 'selected' : '')}>
        로또번호 추천 🎱
      </NavLink>
      <NavLink to="/word" className={({ isActive }) => (isActive ? 'selected' : '')}>
        끝말잇기 ☀️
      </NavLink>
      <NavLink to="/numericalbaseball" className={({ isActive }) => (isActive ? 'selected' : '')}>
        숫자야구 ⚾️
      </NavLink>
      <NavLink to="/rockpaperscissors" className={({ isActive }) => (isActive ? 'selected' : '')}>
        가위바위보 ✋🏻
      </NavLink>
      <NavLink to="/tictactoe" className={({ isActive }) => (isActive ? 'selected' : '')}>
        틱택토 🤹🏻
      </NavLink>
    </NavigationContainer>
  )
}

export default Navigation
