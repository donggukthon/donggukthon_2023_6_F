import styled from 'styled-components';
import HamburgerButtonImg from '@/assets/Button/HamburgerButton.svg';

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  max-height: 932px;
  min-height: 800px;
  //overflow-y: hidden;
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

export const HamburgerButton = styled.button`
  background-image: url(${HamburgerButtonImg});
  background-repeat: no-repeat;
  background-size: contain;
  width: 40px;  // 버튼 크기 조정
  height: 40px; // 버튼 크기 조정
  border: none;
  cursor: pointer;
  position: absolute;
  top: 25px;    // 상단에서의 위치
  left: 25px;   // 좌측에서의 위치
  z-index: 2;
  background-color: transparent;
`;
