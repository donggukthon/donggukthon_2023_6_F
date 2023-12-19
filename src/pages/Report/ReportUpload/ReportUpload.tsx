import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import { useRecoilState } from 'recoil';
import { contentState, imageUrlState } from '@/atoms/trashCan';
import ImageAnalyzer from '@/components/GoogleVision/ImageAnalyzer';
import Loading from '@/components/Loading/Loading'; // 가정한 로딩 컴포넌트

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
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const content = useInput<HTMLTextAreaElement>();
  const [, setContent] = useRecoilState(contentState);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl);
      setIsLoading(true); // 이미지 분석 시작 시 로딩 상태 설정
      return () => URL.revokeObjectURL(newImageUrl);
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
    alert(`${labels}`)//TODO: 테스트용.
    setTimeout(() => setIsLoading(false), 500); // 로딩 상태 해제 (0.5초 지연)
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    content.handleChange(e);
  };

  return (
    <PageLayoutGreen title={"제보하기"}>
      {imageUrl && (
        <>
          <S.ImagePreview imageUrl={imageUrl} />
          <ImageAnalyzer imageUrl={imageUrl} onDetectionResult={handleDetectionResult} />
          {isLoading && <Loading />} {/* 로딩 컴포넌트 */}
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