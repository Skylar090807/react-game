import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import Home from './pages/Home'
import Lotto from './pages/Lotto'
import MultiplicationTable from './pages/MultiplicationTable/index'

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multiplicationTable" element={<MultiplicationTable />} />
          <Route path="/lotto" element={<Lotto />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default App
