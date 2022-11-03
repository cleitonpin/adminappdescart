import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer } from 'react-toastify'

export const GlobalStyle = createGlobalStyle`
  :root {
    --box-shadow-red: 0px 50px 70px -20px rgba(83, 9, 19, 0.05);
    --border-gray: 1px solid rgba(0, 0, 0, 0.1);
  }

  html {
    scroll-behavior: smooth;
  }

  *, *::after, *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  *::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #D62929;
  }

  body {
    font-size: 1rem;
    background: #F2F2F6;
  }

  button, input {
    outline: 0;
    border: 0;
  }

  button {
    cursor: pointer;
    background: transparent;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  img {
    pointer-events: none;
  }
`;