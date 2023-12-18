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
