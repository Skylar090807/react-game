import React, { Fragment, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

interface IHome {}

const Home: React.FC<IHome> = (props: IHome) => {
  return (
    <Fragment>
      <NavLink to="/multiplicationTable" className={({ isActive }) => (isActive ? 'selected' : '')}>
        구구단게임 💯
      </NavLink>
      <NavLink to="/lotto" className={({ isActive }) => (isActive ? 'selected' : '')}>
        로또게임 🎱
      </NavLink>
    </Fragment>
  )
}

export default Home
