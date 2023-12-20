import { styled } from "styled-components";
import GreenMainImg from '@/assets/GreenMainImg/GreenMainImg.png'
import GoogleImg from '@/assets/Button/Google.png'

export const Main = styled.div`
    margin-top: 160px;
    width: 430px;
    height: 91px;
    flex-shrink: 0;
    font-family: 'NEXONLv1Gothic';
`;

export const subTitle = styled.div`
    color: #000;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: NEXON Lv1 Gothic;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
    letter-spacing: -0.24px;
    margin-bottom: 20px;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: NEXON Lv1 Gothic;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.24px;
`;

export const Image = styled.div`
    margin-top: 100px;
    left: 50%;
    width: 300px;
    height: 300px;
    background-size: 300px 300px;
    background-image: url(${GreenMainImg});
`;

export const Button = styled.div`
    margin-top: 50px;
    width: 300px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 30px;
    border: 1px solid #000;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: 'NEXONLv1Gothic';
`;

export const ButtonImage = styled.span`
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background-image: url(${GoogleImg});
    background-size: contain;
    margin-right: 10px;
`;

export const ButtonText = styled.span`
    color: #000;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: NEXON Lv1 Gothic;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: -0.24px;
`;