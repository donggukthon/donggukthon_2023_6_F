import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 440px;
  max-height: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NEXONLv1Gothic';
  position: relative;
`;

// 스피너 애니메이션 정의
export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스피너 스타일 컴포넌트
export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; // Light grey
  border-top: 10px solid #383636; // Blue
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

// 스피너 컨테이너 스타일 컴포넌트
export const SpinnerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  position: fixed; // 뷰포트 기준 고정
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 932px;
  display: flex;
  justify-content: center;
  max-height: 932px;
  min-height: 850px;
  //overflow-y: hidden;
  overflow-x: hidden;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  z-index: 999;
`;
