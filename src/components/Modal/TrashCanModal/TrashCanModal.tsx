import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton/ModalButton';
import * as S from './style';
import useModal from '@/hooks/useModal';
import SmallModal from '../SmallModal/SmallModal';
import {useMutation} from '@tanstack/react-query';
import { declarationsNoTrashCan } from '@/apis/trashCan';
import { trashCansState } from '@/atoms/trashCan';
import { useRecoilValue } from 'recoil';

export default function TrashCanModal({onClose, isOpen, trashCanId}) {
  const { isOpen : openSucessModal, openModal, closeModal } = useModal(); // useModal 훅 사용
  const trashCans = useRecoilValue(trashCansState).data.trashCans;
  const selectedTrashCan = trashCans.find(trashCan => trashCan.trashCanId === trashCanId);

  const { mutate } = useMutation({
    mutationFn: () => declarationsNoTrashCan({ trashCanId }),
    onSuccess: (data) => {
      if (data.status === 200) {
        openModal(); // 성공적으로 신고 처리됨
      } else if (data.status === 404) {
        alert('쓰레기통이 없습니다');
      } else if (data.status === 400) {
        alert('이미 해당 쓰레기통에 대해 신고하셨어요!');
      }
    },
    onError: (error) => {
      console.log('Error occurred:', error);
    },
  });

  const handleNoTrashCan = () => {
    mutate(); // mutate 함수를 호출하여 신고 처리
  }

  const handleCloseSuccessModal = () => {
    closeModal();
    onClose();
  }

  return (
    <>
      <Modal
        modalTitle={selectedTrashCan ? selectedTrashCan.address : ''}
        isOpen={isOpen}
        onClose={onClose}
        imageType={'MediumModal'}
      >
        <S.Wrapper>
          <S.ImgBox>
          <S.Img src={selectedTrashCan ? selectedTrashCan.picture : ''} />
          </S.ImgBox>
        </S.Wrapper>
        <S.ModalOkButtonWrapper>
          <ModalButton buttonName="여기 없어요!" onClick={handleNoTrashCan} />
        </S.ModalOkButtonWrapper>
      </Modal>
      
      {openSucessModal && (
          <SmallModal 
            modalTitle={'제보 접수 완료'} 
            modalText={'이용에 불편을 드려 죄송합니다. \n 최대한 빠른 조치하겠습니다.'} 
            isOpen={isOpen}
            onClose={handleCloseSuccessModal}
          />
      )}
    </>

  );
}