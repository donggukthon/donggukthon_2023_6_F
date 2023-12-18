import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';

type Props = {
  buttonImgSrc?: string;
  route?: string;
};

export default function PageLayoutGreenBottom({ buttonImgSrc, route }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // 현재 경로가 '/report'인지 확인
  const isReportPage = location.pathname === '/report';

  const handleNavigate = () => {
    if (isReportPage) {
      // '/report' 페이지에서 카메라 버튼일 경우
      inputRef.current.click(); // input 태그를 클릭하도록 합니다.
    } else {
      // 다른 페이지에서 다른 버튼일 경우
      navigate(route);
    }
  };

  // 카메라 촬영 후 처리
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 사진 처리 및 이동
      navigate('/report/upload', { state: { image: file } });
    }
  };

  return (
    <>
      {isReportPage && (
        <S.HiddenInput 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={inputRef} 
        onChange={handleCapture}
      />
      )}
      <S.Wrapper>
        <S.BottomNavBar>
          {buttonImgSrc && (
            <S.ImageButton src={buttonImgSrc} onClick={handleNavigate} />
          )}
        </S.BottomNavBar>
      </S.Wrapper>
    </>
  );
}
