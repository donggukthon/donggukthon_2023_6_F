import React from 'react'
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen'
import * as S from './style'
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom'
import CameraButtonImg from '@/assets/Button/CameraButton.png'

export default function Trash() {
  return (
    <PageLayoutGreen title={"신고하기"}>
        <S.Text>
            쓰레기를 촬영해주세요!
        </S.Text>
        <S.Main />
        <PageLayoutGreenBottom buttonImgSrc={CameraButtonImg}/>
    </PageLayoutGreen>

  )
}
