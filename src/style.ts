import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 

  html {
    font-size: 16px; // 16px 기본 설정
    background-color:  #FFFFFF;
    overflow-x: hidden;
  }

  body, html {
    font-weight: 700;
    margin: 0;
    font-size: 16px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center; 
  }

  #content {
    position: relative;
    height: 100%;
    overflow: auto;
    z-index: 1;
  }
`;
