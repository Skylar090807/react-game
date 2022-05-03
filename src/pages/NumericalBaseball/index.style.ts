import styled from 'styled-components'

// index.tsx
export const NumericalBaseballContainer = styled.div`
  input {
    width: 10em;
    height: 2.5em;
    margin-right: 0.3em;
  }
`
export const Result = styled.div`
  font-size: 2em;
  margin-bottom: 1em;
  background: #dde9ff;
  width: fit-content;
  padding: 1em;
  border-radius: 3em;
  border: 0.5em solid #b7d1ff;
  color: #526b93;
  font-weight: 500;
`
export const TryNumber = styled.div`
  color: #526b93;
  font-weight: 500;
  font-size: 2em;
  margin-top: 1em;
  margin-bottom: 1em;
`
export const Tries = styled.div`
  font-size: 1.5em;
  color: #fff;
  font-weight: 500;
`

// try.tsx
export const TryInfoWrapper = styled.div`
  background: lightblue;
  width: fit-content;
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 2em;
`
export const TryInfoTry = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`
export const TryInfoResult = styled.div``
