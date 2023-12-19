import React from 'react'
import LgreenPageLayout from '@/components/LgreenPageLayout/LgreenPageLayout'
import Button from '@/components/Button/Button';
import * as S from './style'

export default function Onboarding() {
  const handleClick = () => {
      window.location.href = '';
  }

  return (
    <LgreenPageLayout>
        <S.Main>
          <S.subTitle>{'쓰레기통 위치 알리미'}</S.subTitle>
          <S.Title>{'Clean City'}</S.Title>
        </S.Main>  
        <S.Image /> 
        <S.Button onClick={handleClick}>
          <S.ButtonImage/>
          <S.ButtonText >{'Google 계정으로 로그인'}</S.ButtonText>
        </S.Button>
    </LgreenPageLayout>
  );
}
