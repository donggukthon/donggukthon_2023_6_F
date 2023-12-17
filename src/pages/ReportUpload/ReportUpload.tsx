import React from 'react';
import { useLocation } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.svg';
import * as S from './style';
import useInput from '@/hooks/useInput';



export default function ReportUpload() {
  const location = useLocation();
  const image = location.state?.image; // 이전 페이지에서 넘겨받은 이미지 파일
  const content = useInput<HTMLTextAreaElement>();

  return (
    <PageLayoutGreen title={"제보하기"}>
      {image && (
        <S.ImagePreview imageUrl={URL.createObjectURL(image)} />
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
