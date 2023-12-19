import * as S from './style';

type Props = {
  children: React.ReactNode;
};


export default function LPageLayout({children}: Props) {
  return (
    <S.Layout>
        <S.Wrapper>
          <S.NavBar />
        <S.HamburgerButton />
          {children}
        </S.Wrapper>
    </S.Layout>
  );
}
