import styled, {keyframes, css} from 'styled-components';
import SmallModalImg from '@/assets/Modal/SmallModal.png';
import MediumModalImg from '@/assets/Modal/MediumModal.png';
import { ModalContentProps, ModalWrapperProps } from '@/interfaces/modal';
import theme from '@/theme';
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// ModalWrapper 컴포넌트에 ModalWrapperProps 타입을 적용하여 show 프로퍼티를 사용할 수 있도록 했습니다.
const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) =>
    props.show === undefined
      ? 'block'
      : props.show === true
      ? 'block'
      : 'none'};
  z-index: 999;
`;

const getModalBackgroundImage = (
  imageType?:
    | 'SmallModal'
    | 'MediumModal',
) => {
  switch (imageType) {
    case 'SmallModal':
      return SmallModalImg;
    case 'MediumModal':
      return MediumModalImg;
    default:
      return MediumModalImg;
  }
};

const getModalSize = (
  imageType?:
    | 'SmallModal'
    | 'MediumModal'
    | 'LargeModal',
) => {
  switch (imageType) {
    case 'SmallModal':
      return {width: '300px', height: '150px'};
    case 'MediumModal':
      return {width: '350px', height: '400px'};
    default:
      return {width: '350px', height: '400px'}; // 기본값
  }
};

const ModalContent = styled.div<ModalContentProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${(props) => getModalBackgroundImage(props.imageType)});
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  padding: 12px;
  ${({imageType}) => {
    const {width, height} = getModalSize(imageType);
      return css`
        width: ${width};
        height: ${height};
        bottom: 50%;
        transform: translate(-50%, -50%);
      `;
    
  }}
  color: ${theme.colors.black};
  font-size: 20px;
  overflow-y: auto;
`;

const ModalInnerContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ModalTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  color: ${theme.colors.black};
  font-size: 15px;
  overflow-y: auto;
  white-space: pre;
  overflow: hidden;
  font-weight: bolder;
`;

export const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
`;

export const S = {
  fadeIn,
  fadeOut,
  ModalWrapper,
  ModalContent,
  ModalInnerContent,
  ModalTitle,
};
