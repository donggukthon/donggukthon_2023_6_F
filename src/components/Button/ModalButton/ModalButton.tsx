// ModalOKButton 컴포넌트
import * as S from './style'
import {ModalOKButtonProps, ModalButtonProps} from '@/interfaces/button';

interface CombinedProps extends ModalOKButtonProps, ModalButtonProps {}

export default function ModalButton({buttonName, onClick}: CombinedProps) {
  return (
    <>
      <S.ModalButton type="submit" onClick={onClick}>
        {buttonName}
      </S.ModalButton>
    </>
  );
}