import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

export const Head = styled.div`
  position: absolute;
  top: 2rem;
  left: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 325px;
  cursor: pointer;

  p {
    font: 600 24px/33px Nunito;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1023px) {
      color: #da1e37;
      font-size: 14px;
      line-height: 19px;
    }
  }

  @media screen and (max-width: 1200px) {
    left: 10rem;
  }

  @media screen and (max-width: 1023px) {
    left: 0;
    justify-content: space-evenly;
    width: 250px;
  }
`;

export const LoginContainer = styled.div`
  /* position: absolute; */
  top: 18rem;
  left: 67rem;
  width: 550px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1023px) {
    overflow-x: hidden;
    height: 100vh;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 434px;
  position: absolute;
  top: 25%;
  left: 10%;

  @media screen and (max-width: 11023px) {
    left: 6%;
  }

  @media screen and (max-width: 1350px) {
    left: 3%;
  }

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const SubTextWrapper = styled.p`
  font: 300 22px/30px Nunito;
  margin: ${(p) => p.margin};
  color: #ffffff;
  text-align: center;

  @media screen and (max-width: 1350px) {
    font: 300 18px/25px Nunito;
  }
`;

export const TitleTextWrapper = styled.p`
  font: 600 36px/49px Nunito;
  margin: ${(p) => p.margin};
  color: #ffffff;
  text-align: center;

  @media screen and (max-width: 1350px) {
    font: 600 30px/40px Nunito;
  }
`;

export const ButtonRegister = styled.button`
  border: 3px solid #ffffff;
  box-sizing: border-box;
  height: 87px;
  width: 244px;

  a {
    background: #da1e37;
    font: 600 36px/49px Nunito;
    color: #ffffff;
  }

  @media screen and (max-width: 1350px) {
    height: 70px;
    width: 205px;
    a {
      font: 600 30px/40px Nunito;
    }
  }
`;

export const LoginTitle = styled.p`
  font: 600 36px/49px Nunito;
  text-align: center;
  color: #1a1a1a;
  margin: 44px 0;

  @media screen and (max-width: 1023px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const Text = styled.p`
  font: ${(p) => p.weight} 25px/35px Nunito;
  color: ${(p) => p.color};

  margin-left: ${(p) => p.marginL};
`;

export const Forgot = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto 0;

  p {
    @media screen and (max-width: 1023px) {
      font-size: 13px;
      line-height: 18px;
    }
  }

  p:last-child {
    cursor: pointer;
  }
`;

export const Sigin = styled.button`
  background: #da1e37;
  border-radius: 5px;
  font: 500 30px/41px Nunito;
  color: #ffffff;
  width: 390px;
  height: 53px;
  border: none;
  margin: 30px 0;

  @media screen and (max-width: 550px) {
    width: 75%;
    margin-bottom: 24px;
  }
`;

export const Image = styled.img`
  width: auto;
  height: auto;

  @media screen and (max-width: 1350px) {
    width: 100px;
    height: auto;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .button {
    display: flex;
    flex-direction: row;
  }

  @media only screen and (max-width: 450px) {
    ${(p) => p.mobile};
  }
`;
