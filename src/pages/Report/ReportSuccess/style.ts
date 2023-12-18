import styled from 'styled-components';
import theme from '@/theme';

export const Text = styled.div`
    color: ${theme.colors.black};
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.24px;
    margin-top: 170px;
`;

export const ButtonText = styled.span`
    color: ${theme.colors.black};
    text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 100% */
  letter-spacing: -0.24px;
`;