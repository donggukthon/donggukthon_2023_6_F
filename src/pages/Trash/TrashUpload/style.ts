import { ImagePreviewProps } from '@/interfaces/reportUpload';
import styled from 'styled-components';
import theme from '@/theme';

export const ImagePreview = styled.div<ImagePreviewProps>`
  width: 300px;
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  background-image: url(${props => props.imageUrl});
  margin-top: 2.5px;
  margin-left: 2.5px;
  margin-top: 166px;
  position: absolute;
`;

export const ContentsArea = styled.textarea`
    position: absolute;
    width: 320px;
    height: 120px;
    border: none;
    border-radius: 30px;
    border: 3px solid #000;
    color: ${theme.colors.black};
    overflow: auto;
    padding: 20px;
    resize: none;
    background-color: ${theme.colors.white};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: -0.24px;
    &::placeholder {
        color: ${theme.colors.black};
        font-size: 20px;
    }
    margin-top: 482px;
    font-family: inherit;
`;
