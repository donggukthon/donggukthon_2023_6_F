import styled from 'styled-components';

export const ModalText = styled.div`
  color: ${(props) => props.theme.black};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  margin-top: 47px;
  margin-bottom: 20px;
  white-space: pre-line;
`;

export const ModalOkButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 74px;
  margin-bottom: 40px;
`;

export const ImgBox = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;