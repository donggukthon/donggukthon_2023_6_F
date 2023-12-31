import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';
import SmallModal from '@/components/Modal/SmallModal/SmallModal';
import useModal from '@/hooks/useModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLocationInfoState } from '@/atoms/user';
import { contentState, imageFileState } from '@/atoms/trashCan';
import { useMutation } from '@tanstack/react-query';
import { TrashCanReport } from '@/apis/trashCan';
import { TrashComplaint } from '@/apis/trash';

type Props = {
  buttonImgSrc?: string;
  route?: string;
};

export default function PageLayoutGreenBottom({ buttonImgSrc, route }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal(); // useModal 훅 사용
  const userLocationInfo = useRecoilValue(userLocationInfoState); // Recoil 상태 사용
  const [,setImageFile] = useRecoilState(imageFileState);
  const image = useRecoilValue(imageFileState);
  const content = useRecoilValue(contentState);


  const isReportPage = location.pathname === '/report';
  const isTrashPage = location.pathname === '/trash';
  const isReportUploadPage = location.pathname ==='/report/upload'
  const isTrashUploadPage = location.pathname === '/trash/upload';


  if(isReportUploadPage) {
    localStorage.setItem("trashCanContent", content);
  } else if (isTrashUploadPage) {
    localStorage.setItem("trashContent", content);

  }
  const latitude = Number(localStorage.getItem("latitude"));
  const longitude = Number(localStorage.getItem("longitude"));
  
  // const mutateTrashCan = useMutation({
  //   mutationFn: () => TrashCanReport({ 
  //     picture: image, 
  //     address: userLocationInfo.address,
  //     latitude: latitude,
  //     longitude: longitude,
  //     information: content
  //   }),
  //   onSuccess: () => {
  //     if(isTrashUploadPage) {
  //       openModal(); // isTrashUploadPage가 true일 때 모달 열기
  //     } else {
  //       navigate('success');
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('Error occurred:', error);
  //     alert("쓰레기통을 등록하는 데에 실패했어요.")
  //   },
  // });

  // const mutateTrash = useMutation({
  //   mutationFn: () => TrashComplaint({ 
  //     picture: image, 
  //     address: userLocationInfo.address,
  //     latitude: latitude,
  //     longitude: longitude,
  //     information: content
  //   }),
  //   onSuccess: () => {
  //     if(isTrashUploadPage) {
  //       openModal(); // isTrashUploadPage가 true일 때 모달 열기
  //     } else {
  //       navigate('success');
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('Error occurred:', error);
  //     alert("쓰레기를 등록하는 데에 실패했어요.")
  //   },
  // });


  const handleNavigate = () => {
    if (isReportPage) {
      inputRef.current.click();
    } else if (isTrashUploadPage) {
      //mutateTrash.mutate(); // /trash/upload 페이지일 경우 mutate 함수 호출
      if(isTrashUploadPage) {
               openModal(); // isTrashUploadPage가 true일 때 모달 열기
             } else {
               navigate('success');
             }
    } else if (isTrashPage) {
      inputRef.current.click(); // /trash 페이지일 경우 inputRef 클릭 이벤트 발생
    } else if (isReportUploadPage) {
      //mutateTrashCan.mutate();
      if(isTrashUploadPage) {
               openModal(); // isTrashUploadPage가 true일 때 모달 열기
             } else {
              navigate('success');
             }
    } else {
      navigate(route);
    }
  };
  

  // 카메라 촬영 후 처리
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 사진 처리 및 이동
      setImageFile(file); // setImageFile은 Recoil atom을 업데이트하는 함수
      if(isReportPage) {
        navigate('/report/upload', { state: { image: file } });
      } else if(isTrashPage) {
        navigate('/trash/upload', { state: { image: file } });
      }
      
    }
  };

  const handleCloseModal = () => {
    closeModal(); // 모달 상태를 닫는다
    navigate('/home');
  };

  return (
    <>
      {(isReportPage || isTrashPage )&& (
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