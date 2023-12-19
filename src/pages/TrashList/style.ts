import styled from 'styled-components';

type PaginationButtonProps = {
  isActive: boolean;
};

export const Info = styled.div`
    padding: 30px;
    text-align: center;
    color: #000;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: NEXON Lv1 Gothic;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: -0.24px;
    position: relative;
    margin-top: 50px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
`;

export const PaginationContainer = styled.div`
  /* 스타일 추가 */
`;


  // isActive 속성을 타입스크립트로 명시
  export const PaginationButton = styled.button<PaginationButtonProps>`
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
    /* 추가 버튼 스타일 */
  `;
  