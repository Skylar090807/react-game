import styled from 'styled-components'

export const WordGameContainer = styled.div`
  input {
    padding: 11px;
    border-radius: 10px;
    border-style: none;
    background: #ddeaff;
  }
`

export const WordGameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Word = styled.div`
  font-size: 2em;
  background: lightblue;
  width: 10%;
  border-radius: 20px;
  padding: 0.3em;
  color: whitesmoke;
  font-weight: 900;
  margin-bottom: 2em;
`

export const WordGameResult = styled.div`
  margin-top: 3em;
  font-size: 1.5em;
  font-weight: bold;
`
