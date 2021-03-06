import React, { Fragment } from 'react'
import { Layout } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import Home from './pages/Home'
import Lotto from './pages/Lotto'
import MultiplicationTable from './pages/MultiplicationTable/index'
import Header from './Layout/header'
import Footer from './Layout/footer'
import WordGame from './pages/WordGame'
import NumericalBaseball from './pages/NumericalBaseball'
import RockPaperScissors from './pages/RockPaperScissors'
import TicTacToe from './pages/Tic-Tac-Toe'
import Minesweeper from './pages/Minesweeper'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout.Content>
          <Fragment>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/multiplicationTable" element={<MultiplicationTable />} />
              <Route path="/lotto" element={<Lotto />} />
              <Route path="/word" element={<WordGame />} />
              <Route path="/numericalbaseball" element={<NumericalBaseball />} />
              <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/minesweeper" element={<Minesweeper />} />
            </Routes>
          </Fragment>
        </Layout.Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  )
}

export default App
