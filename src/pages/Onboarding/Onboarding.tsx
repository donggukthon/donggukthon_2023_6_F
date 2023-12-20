import React from 'react'
import LgreenPageLayout from '@/components/LgreenPageLayout/LgreenPageLayout'
import * as S from './style'
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate(); //TODO: 로그인 구현되면 삭제 예정

  const handleClick = () => {
      //window.location.href = '';
      navigate('/home'); //TODO: 로그인 구현되면 삭제 예정
  }

  return (
    <LgreenPageLayout>
        <S.Main>
        </S.Main>  
        <S.Button onClick={handleClick}>
          <S.ButtonImage/>
          <S.ButtonText >{'Google 계정으로 로그인'}</S.ButtonText>
        </S.Button>
    </LgreenPageLayout>
  );
}
