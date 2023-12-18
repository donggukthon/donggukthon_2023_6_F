import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import * as S from './style';
import SmallButton from '@/components/Button/SmallButton/SmallButton';
import { useNavigate } from 'react-router-dom';

export default function ReportSuccess() {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/home')
  }

  return (
    <PageLayoutGreen title={"제보하기"}>
      <S.Text> 
        등록이 완료되었습니다
      </S.Text>
      <SmallButton margin="130px 0 0 0" 
        onClick={() =>
          handleNavigate()
        }>
          <S.ButtonText >{'확인'}</S.ButtonText>
      </SmallButton>
    </PageLayoutGreen>
  );
}
