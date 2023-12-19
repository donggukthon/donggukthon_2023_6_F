import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import PageLayoutGreenBottom from '@/components/PageLayoutGreenBottom/PageLayoutGreenBottom';
import CheckButtonImg from '@/assets/Button/CheckButton.png';
import * as S from './style';
import useInput from '@/hooks/useInput';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useRecoilState } from 'recoil';
import { contentState, imageUrlState } from '@/atoms/trashCan';


const validPredictions = [
  'ashcan', 'trash can', 'garbage can', 'wastebin', 'ash bin',
  'ash-bin', 'ashbin', 'dustbin', 'trash barrel', 'trash bin',
  'trash-can', 'garbage-can'
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

  useEffect(() => {
    const classifyImage = async (imageSrc: string) => {
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
              const predictionResult = result[0].className;        
              // validPredictions 배열 내의 요소 중 하나라도 predictionResult에 포함되어 있는지 확인
              const isValidPrediction = validPredictions.some(prediction => 
                predictionResult.includes(prediction.toLowerCase())
              );
              alert(`${predictionResult}`)
              if (!isValidPrediction) {
                // 일치하는 예측 결과가 없으면 /report로 네비게이트
                alert('쓰레기통을 다시 촬영해주세요!')
                navigate('/report');
              }
            } else {
              //alert('분석 결과가 없습니다.');
            }
          } catch (error) {
            //alert('분류 오류');
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
  }, [imageUrl, navigate]);

    // 입력값 변경 시 호출될 함수
    const handleChange = (e) => {
      // Recoil 상태 업데이트
      setContent(e.target.value);
  
      // useInput 훅의 handleChange 함수 호출
      content.handleChange(e);
    };

    return (
      <PageLayoutGreen title={"제보하기"}>
        {imageUrl && <S.ImagePreview imageUrl={imageUrl} />}
        <S.ContentsArea
          placeholder="쓰레기통 위치에 대한 간단한 설명."
          value={content.value}
          onChange={handleChange}
        />
        <PageLayoutGreenBottom buttonImgSrc={CheckButtonImg} />
      </PageLayoutGreen>
    );
  }
