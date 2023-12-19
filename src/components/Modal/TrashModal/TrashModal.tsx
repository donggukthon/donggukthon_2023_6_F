import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton/ModalButton';
import * as S from './style';
import useModal from '@/hooks/useModal';
import SmallModal from '../SmallModal/SmallModal';
import {useMutation} from '@tanstack/react-query';
import { trashesState } from '@/atoms/trash';
import { useRecoilValue } from 'recoil';
import { cleanTrash } from '@/apis/trash';

type TrashModalProps = {
  onClose: () => void;
  isOpen: boolean;
  trashId: number; // 여기에서 trashId의 타입을 number로 명시
};

export default function TrashModal({ onClose, isOpen, trashId }: TrashModalProps) {
  const { isOpen : openSucessModal, openModal, closeModal } = useModal(); // useModal 훅 사용
  const trashes = useRecoilValue(trashesState).data.complaintList;
  const selectedTrash = trashes.find(trashes => trashes.trashId === trashId);

  const { mutate } = useMutation({
    mutationFn: () => cleanTrash(trashId),
    onSuccess: () => {
      openModal();
    },
    onError: (error) => {
      console.log('Error occurred:', error);
    },
  });

  const handleCleanTrash = () => {
    //TODO: 쓰레기 치웠어요! 버튼 누르면 카메라앱 연결 -> 쓰레기 없는지 detection -> 없으면 쓰레기 상태변경 api 호출, 있으면 alert(‘아직 쓰레기가 더 있어요.’)
  }

  const handleCloseSuccessModal = () => {
    closeModal();
    onClose();
  }

  return (
    <>
      <Modal
        modalTitle={selectedTrash ? selectedTrash.address : ''}
        isOpen={isOpen}
        onClose={onClose}
        imageType={'MediumModal'}
      >
        <S.Wrapper>
          <S.ImgBox>
          <S.Img src={selectedTrash ? selectedTrash.picture : ''} />
          </S.ImgBox>
        </S.Wrapper>
        <S.ModalOkButtonWrapper>
          <ModalButton buttonName="쓰레기를 치웠어요!" onClick={handleCleanTrash} />
        </S.ModalOkButtonWrapper>
      </Modal>
      
      {openSucessModal && (
          <SmallModal 
            modalTitle={'고마워요!'} 
            modalText={'항상 환경을 생각하는 여러분 덕분에 \n 더 깨끗한 세상으로 변할거예요!'} 
            isOpen={isOpen}
            onClose={handleCloseSuccessModal}
          />
      )}
    </>

  );
}