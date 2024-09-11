import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
  
  a {
    text-decoration: none;
    color: #333;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  button {
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 4px;
    background-color: #41434C;

    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }

  input {
    padding: 10px;
    height: 50px;

    border: 1px solid #E3E5E7;
    border-radius: 5px;

    font-size: 20px;
    outline: none;
    color: #333;
  }

  li,ol {
    list-style: none;
  }
`;

export const Footer = styled.footer`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: #999;
  color: #fff;
  bottom: 0;
  
`;

export const FooterText = styled.p`
  margin: 0;
  text-align: center;
`;
