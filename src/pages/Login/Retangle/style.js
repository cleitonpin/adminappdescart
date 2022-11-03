import styled from "styled-components"

export const Container = styled.div`
  /* position: fixed; */
  width: 50%;
  height: 100vh;
  margin-left: -16%;
  overflow: hidden;
  background: ${p => p.backgroud};
  -webkit-transform: skew(0deg); /* Chrome, Opera */
  -ms-transform: skew(0deg); /* IE */
  transform: skew(0deg); /* Padrão */
  -webkit-transform: skew(-10deg); /* Chrome, Opera */
  -ms-transform: skew(-10deg); /* IE */
  transform: skew(-10deg); /* Padrão */

  @media screen and (min-width: 1900px) {
    width: 60%;
  }

  @media screen and (max-width: 1200px) {
    width: 65%;
  }

  @media screen and (max-width: 1023px) {
    display: none;
  }
  
`