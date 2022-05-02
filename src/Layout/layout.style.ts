import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  height: 73px;
  background: #fff;
  display: flex;
  justify-content: start;

  // border-bottom: 1px solid rgba(44, 44, 44, 0.233);
  box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
  .logo {
    width: 90px;
  }
`

export const NavigationContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: block;
    height: 73px;
    line-height: 72px;
    padding: 0 30px;
    font-size: 18px;
    font-weight: 500;
    color: rgb(3, 105, 153);
    text-decoration: none;

    &.selected {
      font-size: 20px;
      font-weight: 600;
      text-shadow: 0px 9px 4px rgba(150, 150, 150, 0.54);
    }
  }
`
export const FooterContainer = styled.div`
  background: rgba(81, 139, 255, 0.2);
  width: 100%;
  height: auto;
  padding: 60px 0;
`
export const FooterWrap = styled.div`
  max-width: 1280px;
  min-width: 1280px;
  margin: 0 auto;
`
