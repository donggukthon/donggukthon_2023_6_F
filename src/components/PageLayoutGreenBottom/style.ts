import { ImageButtonProps } from '@/interfaces/button';
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

export const BottomNavBar = styled.div`
  max-width: 440px;
  width: 100vw;
  height: 138px;
  background-color: #8BC27C;
  z-index: 2;
  text-align: center;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ImageButton = styled.button<ImageButtonProps>`
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin-top: 29px;
`;

export const HiddenInput = styled.input`
  display: none;
`;