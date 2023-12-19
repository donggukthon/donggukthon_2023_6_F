import styled from 'styled-components';

type PaginationButtonProps = {
    isActive: boolean;
};

export const ReportList = styled.span`

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
  
