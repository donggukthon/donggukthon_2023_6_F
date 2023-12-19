import React from 'react';
import { useLocation } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';



export default function TrashUpload() {
  const location = useLocation();
  const imageFile = location.state?.image;
  const content = useInput<HTMLTextAreaElement>();

  return (
    <PageLayoutGreen title={"신고하기"}>
      {imageFile && (
        <S.ImagePreview imageUrl={URL.createObjectURL(imageFile)} />
      )}
      <S.ContentsArea
        placeholder="신고 내용을 작성해주세요."
        value={content.value}
        onChange={content.handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} />
    </PageLayoutGreen>
  );
}
