import Modal from '../Modal';
import ModalOKButton from '@/components/Button/ModalOKButton/ModalOKButton';
import * as S from './style';

export default function SmallModal({onClose, isOpen, modalText, modalTitle}) {
  return (
    <Modal
      modalTitle={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      imageType={'SmallModal'}
    >
      <S.ModalText>{modalText}</S.ModalText>
      <S.ModalOkButtonWrapper>
        <ModalOKButton buttonName="확인" onClick={onClose} />
      </S.ModalOkButtonWrapper>
    </Modal>
  );
}
