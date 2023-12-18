import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const validPredictions = [
  'ashcan', 'trash can', 'garbage can', 'wastebin', 'ash bin',
  'ash-bin', 'ashbin', 'dustbin', 'trash barrel', 'trash bin'
];

export default function ReportUpload() {
  const location = useLocation();
  const navgate = useNavigate();
  const imageFile = location.state?.image;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const content = useInput<HTMLTextAreaElement>();

  useEffect(() => {
    if (imageFile) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImageUrl(newImageUrl);
      return () => URL.revokeObjectURL(newImageUrl); // URL 사용 후 해제
    }
  }, [imageFile]);

  useEffect(() => {
    const classifyImage = async (imageSrc: string) => {
      alert(`classifyImage 함수 시작`)
      try {
        // TensorFlow.js의 백엔드를 설정
        await tf.setBackend('webgl');
        //alert('백엔드 설정 완료');
        const net = await mobilenet.load();
        //alert(`모델 로드 완료`)
        const imgElement = new Image();
        imgElement.src = imageSrc;
        imgElement.onload = async () => {
          try {
            //alert('이미지 로딩 완료');
            const result = await net.classify(imgElement);
            //alert(`분류 결과 : ${result}`)
            if (result && result.length > 0) {
              //alert('분석을 완료했습니다.');
              setPrediction(result[0].className);
            } else {
              //alert('분석 결과가 없습니다.');
              setPrediction('분석 결과가 없습니다.');
            }
          } catch (error) {
            //alert('분류 오류');
            setPrediction('분류 오류가 발생했습니다.');
          }
        };
        imgElement.onerror = (error) => {
          //alert(`이미지 로드 실패: ${error}`);
        };
      } catch (error) {
        //alert(`모델 로딩 오류: ${error}`);
      }
    };

    if (imageUrl) {
      classifyImage(imageUrl);
    }
  }, [imageUrl]);

    // Prediction 값에 따라 후처리
    useEffect(() => {
      if (prediction && !validPredictions.includes(prediction.toLowerCase())) {
        alert('쓰레기통을 다시 촬영해주세요!')
        navgate('/report');
      }
    }, [prediction, navgate]);

  return (
    <PageLayoutGreen title={"제보하기"}>
      {imageUrl && (
        <S.ImagePreview imageUrl={imageUrl} />
      )}
      <S.PredictionWrapper>
        {prediction && validPredictions.includes(prediction.toLowerCase()) ? (
          <S.PredictionText>쓰레기통이 맞습니다!</S.PredictionText>
        ) : (
          <S.PredictionText>분석 중...</S.PredictionText>
        )}
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
