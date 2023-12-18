import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton/ModalButton';
import * as S from './style';
import useModal from '@/hooks/useModal';
import SmallModal from '../SmallModal/SmallModal';
import { useMutation } from '@tanstack/react-query';
import { declarationsNoTrashCan } from '@/apis/trashCan';

export default function TrashCanModal({onClose, isOpen, modalTitle}) {
  const { isOpen : openSucessModal, openModal, closeModal } = useModal(); // useModal 훅 사용

  const handleNoTrashCan = () => {
    openModal();
  }

  const handleCloseSuccessModal = () => {
    closeModal();
    onClose();
  }

  return (
    <>
      <Modal
        modalTitle={modalTitle}
        isOpen={isOpen}
        onClose={onClose}
        imageType={'MediumModal'}
      >
        <S.Wrapper>
          <S.ImgBox>
            <S.Img src={""} />
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