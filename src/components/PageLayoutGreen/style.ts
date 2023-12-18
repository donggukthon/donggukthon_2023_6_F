import styled from 'styled-components';
import BackButtonImg from '../../assets/Button/BackButton.svg';

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  max-height: 932px;
  min-height: 850px;
  overflow-y: scroll;
  overflow-x: hidden;
  font-family: 'NEXONLv1Gothic';
`;

export const Wrapper = styled.div`
  max-width: 440px;
  max-height: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NEXONLv1Gothic';
  position: relative;
`;

export const NavBar = styled.div`
  max-width: 440px;
  width: 100vw;
  height: 50px;
  background-color: #8BC27C;
  z-index: 2;
  text-align: center;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  top : 13px;
  line-height: 50px;
`;

export const BackButton = styled.button`
  background-image: url(${BackButtonImg});
  background-repeat: no-repeat;
  background-size: contain;
  width: 30px;  // 버튼 크기 조정
  height: 30px; // 버튼 크기 조정
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;    // 상단에서의 위치
  left: 24px;   // 좌측에서의 위치
  z-index: 2;
  background-color: transparent;
`;
