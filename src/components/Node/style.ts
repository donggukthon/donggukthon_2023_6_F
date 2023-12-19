import styled from 'styled-components';
import LocationImg from '@/assets/Marker/location.png';

export const Wrapper = styled.div`
    width: 430px;
    height: 145px;
    flex-shrink: 0;
    border: 1px solid #000;
    background-color: #E4F0D5;
`;

export const header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const left = styled.span`    
    display: flex;
    justify-items: space-around;
`;

export const right = styled.span`
    margin-right: 13px;
    color: #F00;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
    letter-spacing: -0.24px;
`;

export const locationImage = styled.div`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    background-image: url(${LocationImg});
    margin-left: 10px;
`;

export const content = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Image = styled.span<{ imageUrl?: string }>`
    width: 110px;
    height: 80.796px;
    flex-shrink: 0;
    margin-left: 24px;
    background-image: url(${props => props.imageUrl});
`;

export const information = styled.span`
    width: 230px;
    height: 83px;
    flex-shrink: 0;
    background: #E4F0D5;
    mix-blend-mode: screen;
    color: #000;
    font-family: NEXON Lv1 Gothic;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 40px;
`;



