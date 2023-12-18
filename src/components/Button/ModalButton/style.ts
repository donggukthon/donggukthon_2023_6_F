import {styled} from 'styled-components';
import ModalButtonImg from '@/assets/Button/ModalButton.png'

export const ModalButton = styled.button`
  font-weight: normal; // 명시적으로 굵기 설정
  width: 196px;
  height: 34px;
  background-size: cover;
  font-size: 15px;
  font-weight: 700;
  border: 0px transparent; // 테두리 색상을 투명
  position: relative;
  z-index: 2;
  color: ${(props) => props.theme.black};
  background-color: transparent;
  background-image: url(${ModalButtonImg});
  background-size: 196px 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
`;