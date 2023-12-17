import theme from '@/theme';
import styled from 'styled-components';

export const ButtonText = styled.span`
    color: ${theme.colors.white};
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 66.667% */
    letter-spacing: -0.24px;
    z-index: 2;
`;