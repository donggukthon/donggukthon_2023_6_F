import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton/ModalButton';
import * as S from './style';
import useModal from '@/hooks/useModal';
import SmallModal from '../SmallModal/SmallModal';
import {useMutation} from '@tanstack/react-query';
import { trashesState } from '@/atoms/trash';
import { useRecoilValue } from 'recoil';

export default function TrashModal({onClose, isOpen, trashId}) {
  const { isOpen : openSucessModal, openModal, closeModal } = useModal(); // useModal 훅 사용
  const trashes = useRecoilValue(trashesState).data.complaintList;
  const selectedTrash = trashes.find(trashes => trashes.trashId === trashId);

  // const { mutate } = useMutation({
  //   mutationFn: () => declarationsNoTrashCan({ trashId }),
  //   onSuccess: (data) => {
  //     if (data.status === 200) {
  //       openModal(); // 성공적으로 신고 처리됨
  //     } else if (data.status === 404) {
  //       alert('쓰레기통이 없습니다');
  //     } else if (data.status === 400) {
  //       alert('이미 해당 쓰레기통에 대해 신고하셨어요!');
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('Error occurred:', error);
  //   },
  // });

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