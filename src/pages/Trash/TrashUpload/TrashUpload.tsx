import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentState, imageFileState } from '@/atoms/trashCan';



export default function TrashUpload() {
  const location = useLocation();
  const navgate = useNavigate();
  const imageFile = location.state?.image;
  const [imageUrl, setImageUrl] = useState<string>(null);
  const image = useRecoilValue(imageFileState);
  const content = useInput<HTMLTextAreaElement>();
  const [, setContent] = useRecoilState(contentState);

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl);
      return () => URL.revokeObjectURL(newImageUrl); // URL 사용 후 해제
    }
  }, [imageFile]);

  // 입력값 변경 시 호출될 함수
  const handleChange = (e) => {
    // Recoil 상태 업데이트
    setContent(e.target.value);

    // useInput 훅의 handleChange 함수 호출
    content.handleChange(e);
  };

  return (
    <PageLayoutGreen title={"신고하기"}>
      {image && (
        <S.ImagePreview imageUrl={imageUrl} />
        )}
      <S.ContentsArea
        placeholder="신고 내용을 작성해주세요."
        value={content.value}
        onChange={handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} />
    </PageLayoutGreen>
  );
}
