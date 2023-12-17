import styled from 'styled-components';

export const SearchInput = styled.input`
    z-index: 1;
    max-width: 440px;
    height: 50px;
    min-width: 300px;
    margin-left: 0px;
    position: absolute;
    top: 20px;
    border: none;
    color: #000;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: -0.24px;
    padding-left: 87px;
    @media (min-height: 441px) {
    max-width: 440px;
    min-width: 440px;
    }
`;
