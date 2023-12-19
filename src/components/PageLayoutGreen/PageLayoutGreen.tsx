import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  children: React.ReactNode;
  title?: string;
};


export default function PageLayoutGreen({children, title}: Props) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <S.Layout>
        <S.Wrapper>
          <S.NavBar>
          <S.BackButton onClick={() => handleNavigateBack()}/>
            {title}
          </S.NavBar>
          {children}
        </S.Wrapper>
    </S.Layout>
  );
}
