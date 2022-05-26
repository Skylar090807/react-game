import styled from 'styled-components'

// header.tsx
export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: start;
  padding: 0 2em;

  border-bottom: 1px solid rgba(44, 44, 44, 0.233);
  // box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
  .logo {
    width: 7em;
  }
`

// navigation.tsx
export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
    transition: 0.5s;

    &.selected {
      font-size: 20px;
      font-weight: 600;
      text-shadow: 0px 9px 4px rgba(150, 150, 150, 0.54);
    }
  }
`

// footer.tsx
export const FooterContainer = styled.div`
  background: rgba(81, 139, 255, 0.2);
  width: 100%;
  height: auto;
  padding: 3em;
`
export const FooterWrap = styled.div`
  width: 100%;
  display: column;
  justify-content: start;
`
export const LogoImgWrap = styled.div`
  margin-bottom: 1em;

  .logo-img {
    width: 5em;
    border-radius: 60%;
  }
`
export const FooterTextWrap = styled.div`
  font-size: 1em;
  color: #576f96;
  font-weight: 600;
`
