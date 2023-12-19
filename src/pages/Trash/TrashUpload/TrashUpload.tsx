import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import { useRecoilState } from 'recoil';
import { contentState, imageFileState, imageUrlState } from '@/atoms/trashCan';

export default function TrashUpload() {
  const location = useLocation();
  const imageFile = location.state?.image;
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const content = useInput<HTMLTextAreaElement>();
  const [, setContent] = useRecoilState(contentState);

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl);
      return () => URL.revokeObjectURL(newImageUrl);
    }
  }, [imageFile, setImageUrl]);

  const handleChange = (e) => {
    setContent(e.target.value);
    content.handleChange(e);
  };

  return (
    <PageLayoutGreen title={"신고하기"}>
      {imageUrl && <S.ImagePreview imageUrl={imageUrl} />}
      <S.ContentsArea
        placeholder="신고 내용을 작성해주세요."
        value={content.value}
        onChange={handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} />
    </PageLayoutGreen>
  );
}
