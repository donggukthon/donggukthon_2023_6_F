import {createGlobalStyle} from 'styled-components';
import NEXONLv1Gothic from './static/font/NEXONLv1Gothic.woff';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'NEXONLv1Gothic';
        src: url(${NEXONLv1Gothic}) format('woff');
        font-weight: normal;
        font-style: normal;
    }

  html {
    font-size: 16px; // 16px 기본 설정
    background-color:  #FFFFFF;
    overflow-x: hidden;
  }

  body, html {
    font-weight: 400;
    margin: 0;
    font-size: 16px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center; 
    font-family: 'NEXONLv1Gothic';
  }

  #content {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
  }
`;
