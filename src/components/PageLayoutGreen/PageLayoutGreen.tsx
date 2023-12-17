import * as S from './style';

type Props = {
  children: React.ReactNode;
  title?: string;
};


export default function PageLayoutGreen({children, title}: Props) {

  return (
    <S.Layout>
        <S.Wrapper>
          <S.NavBar>
            {title}
          </S.NavBar>
        <S.BackButton />
          {children}
        </S.Wrapper>
    </S.Layout>
  );
}
