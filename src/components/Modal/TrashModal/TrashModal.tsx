// TrashModal.tsx
import React, { useRef, useState } from 'react';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton/ModalButton';
import * as S from './style';
import useModal from '@/hooks/useModal';
import SmallModal from '../SmallModal/SmallModal';
import { useMutation } from '@tanstack/react-query';
import { cleanTrash } from '@/apis/trash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imageFileState, imageUrlState, trashesState } from '@/atoms/trash';
import ImageAnalyzer from '@/components/GoogleVision/ImageAnalyzer';

type TrashModalProps = {
  onClose: () => void;
  isOpen: boolean;
  trashId: number;
};

export default function TrashModal({ onClose, isOpen, trashId }: TrashModalProps) {
  const [, setImageFile] = useRecoilState(imageFileState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const inputRef = useRef(null);
  const [, setIsTrashDetected] = useState(true); // 기본적으로 쓰레기가 있다고 가정
  const { isOpen: openSuccessModal, openModal, closeModal } = useModal();
  const trashes = useRecoilValue(trashesState).data.complaintList;
  const selectedTrash = trashes.find(trashes => trashes.trashId === trashId);
  // 이미지 분석 결과 처리
  const handleDetectionResult = (labels) => {
    const trashRelatedKeywords = [
      'trash', 'garbage', 'waste', 'litter', 'rubbish', 'debris', 'refuse', 'pollution', 'dust',
      'plastic', 'transparency', 'plastic bag', 'waste container', 'bin bag', 'pollution'
    ];
        const isTrash = labels.some(label => trashRelatedKeywords.includes(label.toLowerCase()));
    setIsTrashDetected(isTrash);

    if (!isTrash) {
      mutate();
    } else {
      alert('아직 쓰레기가 더 있어요.');
    }
  };

  // 카메라 앱 연결
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Recoil atom을 업데이트
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      localStorage.removeItem("trashImage");
      localStorage.removeItem("trashContent");
      localStorage.removeItem("trashLatitude");
      localStorage.removeItem("trashLongitude");

    }
  };

  // 쓰레기 상태 변경 API 호출
  const { mutate } = useMutation({
    mutationFn: () => cleanTrash(trashId),
    onSuccess: () => {
      openModal();
    },
    onError: (error) => {
      console.log('Error occurred:', error);
    },
  });

  const trashImage = (localStorage.getItem("trashImage"));


  return (
    <>
      <Modal
       // modalTitle={selectedTrash ? selectedTrash.address : ''}
       modalTitle='서울특별시 중구 동국대학교 서울캠퍼스 혜화관'
        isOpen={isOpen}
        onClose={onClose}
        imageType={'MediumModal'}
      >
        <S.Wrapper>
          <S.ImgBox>
          <S.Img src={trashImage} /> {/*src={selectedTrash ? selectedTrash.picture : ''} */}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCapture}
              hidden
            />
          </S.ImgBox>
        </S.Wrapper>
        <S.ModalOkButtonWrapper>
          <ModalButton buttonName="쓰레기를 치웠어요!" onClick={() => inputRef.current.click()} />
        </S.ModalOkButtonWrapper>
      </Modal>
      
      {openSuccessModal && (
        <SmallModal 
          modalTitle={'고마워요!'} 
          modalText={'항상 환경을 생각하는 여러분 덕분에 \n 더 깨끗한 세상으로 변할거예요!'} 
          isOpen={openSuccessModal}
          onClose={() => {
            closeModal();
            onClose();
          }}
        />
      )}

      {/* 이미지 분석 컴포넌트 */}
      {imageUrl && (
        <ImageAnalyzer imageUrl={imageUrl} onDetectionResult={handleDetectionResult} />
      )}
    </>
  );
}
