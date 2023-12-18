import React from 'react'
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen'
import * as S from './style'
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom'
import CameraButtonImg from '@/assets/Button/CameraButton.svg'

export default function Report() {
  return (
    <PageLayoutGreen title={"제보하기"}>
        <S.Text>
            쓰레기통을 촬영해주세요!
        </S.Text>
        <S.Main />
        <PageLayoutGreenBottom buttonImgSrc={CameraButtonImg}/>
    </PageLayoutGreen>

  )
}
