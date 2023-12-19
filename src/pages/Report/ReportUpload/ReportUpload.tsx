import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import { useRecoilState } from 'recoil';
import { contentState, imageUrlState } from '@/atoms/trashCan';
import ImageAnalyzer from '@/components/GoogleVision/ImageAnalyzer';

const validPredictions = [
  'ashcan', 'trash can', 'garbage can', 'wastebin', 'ash bin',
  'ash-bin', 'ashbin', 'dustbin', 'trash barrel', 'trash bin',
  'trash-can', 'garbage-can', 'waste container', 'waste-container',
  'waste-can',
];

export default function ReportUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageFile = location.state?.image;
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState); // Recoil atom 사용
  const content = useInput<HTMLTextAreaElement>();
  const [, setContent] = useRecoilState(contentState);

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl); // Recoil atom 업데이트
      return () => URL.revokeObjectURL(newImageUrl); // URL 사용 후 해제
    }
  }, [imageFile, setImageUrl]);

  const handleDetectionResult = (labels) => {
    const isTrashCanDetected = labels.some(label =>
      validPredictions.includes(label.toLowerCase())
    );
    if (!isTrashCanDetected) {
      alert('쓰레기통을 다시 촬영해주세요!');
      navigate('/report');
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value); // Recoil 상태 업데이트
    content.handleChange(e); // useInput 훅의 handleChange 함수 호출
  };

  return (
    <PageLayoutGreen title={"제보하기"}>
      {imageUrl && (
        <>
          <S.ImagePreview imageUrl={imageUrl} />
          <ImageAnalyzer imageUrl={imageUrl} onDetectionResult={handleDetectionResult} />
        </>
      )}
      <S.ContentsArea
        placeholder="쓰레기통 위치에 대한 간단한 설명."
        value={content.value}
        onChange={handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} />
    </PageLayoutGreen>
  );
}
