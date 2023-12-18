import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';
import SmallModal from '@/components/Modal/SmallModal/SmallModal';
import useModal from '@/hooks/useModal';

type Props = {
  buttonImgSrc?: string;
  route?: string;
};

export default function PageLayoutGreenBottom({ buttonImgSrc, route }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal(); // useModal 훅 사용

  // 현재 경로가 '/report'인지 확인
  const isReportPage = location.pathname === '/report';
  const isTrashUploadPage = location.pathname === '/trash/upload';

  const handleNavigate = () => {
    if (isReportPage) {
      inputRef.current.click();
    } else if (isTrashUploadPage) {
      openModal(); // isTrashUploadPage가 true일 때 모달 열기
    } else {
      navigate(route);
    }
  };

  // 카메라 촬영 후 처리
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 사진 처리 및 이동
      navigate('/report/upload', { state: { image: file } });
    }
  };

  const handleCloseModal = () => {
    closeModal(); // 모달 상태를 닫는다
    navigate('/report/noticeboard'); // /report/noticeboard로 이동한다
  };

  return (
    <>
      {isReportPage && (
        <S.HiddenInput 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={inputRef} 
        onChange={handleCapture}
      />
      )}
      <S.Wrapper>
        <S.BottomNavBar>
          {buttonImgSrc && (
            <S.ImageButton src={buttonImgSrc} onClick={handleNavigate} />
          )}
        </S.BottomNavBar>
      </S.Wrapper>

      {isOpen && (
        <SmallModal 
          modalTitle={'신고 접수 완료'} 
          modalText={'깨끗한 환경 만들기 \n 동참해주셔서 감사합니다.'} 
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
