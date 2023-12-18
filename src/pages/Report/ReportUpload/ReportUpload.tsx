import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function ReportUpload() {
  const location = useLocation();
  const imageFile = location.state?.image;
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState('');
  const content = useInput<HTMLTextAreaElement>();

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl);
      return () => URL.revokeObjectURL(newImageUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    const classifyImage = async (imageSrc) => {
      const net = await mobilenet.load();
      const imgElement = new Image();
      imgElement.src = imageSrc;
      imgElement.onload = async () => {
        try {
          const result = await net.classify(imgElement);
          if (result && result.length > 0) {
            setPrediction(result[0].className);
          } else {
            setPrediction('분석 결과가 없습니다.');
          }
        } catch (error) {
          console.error('분류 오류:', error);
          setPrediction('분류 오류가 발생했습니다.');
        }
      };
    };

    if (imageUrl) {
      classifyImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <PageLayoutGreen title={"제보하기"}>
      {imageUrl && (
        <S.ImagePreview imageUrl={imageUrl} />
      )}
      <S.PredictionWrapper>
        {prediction && <S.PredictionText>쓰레기통 분석 결과: {prediction}</S.PredictionText>}
      </S.PredictionWrapper>
      <S.ContentsArea
        placeholder="쓰레기통 위치에 대한 간단한 설명."
        value={content.value}
        onChange={content.handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} route={"/report/upload/success"}/>
    </PageLayoutGreen>
  );
}
