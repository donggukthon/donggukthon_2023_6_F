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

      // URL 사용 후 해제
      return () => URL.revokeObjectURL(newImageUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    const classifyImage = async (imageSrc) => {
      const net = await mobilenet.load();
      const imgElement = document.createElement('img');
      imgElement.src = imageSrc;
      imgElement.onload = async () => {
        const result = await net.classify(imgElement);
        setPrediction(result[0].className);
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
      <div>
        {prediction && <p>Prediction: {prediction}</p>}
      </div>
      <S.ContentsArea
        placeholder="쓰레기통 위치에 대한 간단한 설명."
        value={content.value}
        onChange={content.handleChange}
      />
      <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} route={"/report/upload/success"}/>
    </PageLayoutGreen>
  );
}
