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

export default function TrashUpload() {
    const location = useLocation();
    const navigate = useNavigate()
    const [detectionResult, setDetectionResult] = useState(null);
    const [isTrashDetected, setIsTrashDetected] = useState(false);
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

    const handleChange = (e) => {
        setContent(e.target.value);
        content.handleChange(e);
    };

    const handleDetectionResult = (labels) => {
      setDetectionResult(labels);
      const trashRelatedKeywords = [
        'trash', 'garbage', 'waste', 'litter', 'rubbish', 'debris', 'refuse', 'pollution', 'dust',
        'plastic', 'transparency', 'plastic bag', 'waste container', 'bin bag', 'pollution'
      ];
            const isTrash = labels.some(label => 
          trashRelatedKeywords.includes(label.toLowerCase())
      );
      setIsTrashDetected(isTrash);

      // 쓰레기가 감지되지 않았을 경우 /trash 경로로 리디렉션
      if (!isTrash) {
        alert('쓰레기가 잘 보이지 않아요. 더 가까이에서 촬영해주세요.')
        navigate('/trash');
      }
      alert(`${labels}`) //TODO: 테스트용.
      setTimeout(() => setIsLoading(false), 500); // 로딩 상태 해제 (0.5초 지연)
  };

    return (
        <PageLayoutGreen title={"신고하기"}>
            {imageUrl && (
                <>
                    <S.ImagePreview imageUrl={imageUrl} />
                    <ImageAnalyzer imageUrl={imageUrl}onDetectionResult={handleDetectionResult} />
                    {isLoading && <Loading />} {/* 로딩 컴포넌트 */}
                </>
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
