import { styled } from "styled-components";
import MainImg from '@/assets/MainImg/MainImg.png'
export const Text = styled.div`
    color: #000;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 66.667% */
    letter-spacing: -0.24px;
    margin-top: 170px;
`;

export const Main = styled.div`
    width: 300px;
    height: 350px;
    background-size: 300px 350px;
    background-image: url(${MainImg});
    margin-top : 60px;
`;
