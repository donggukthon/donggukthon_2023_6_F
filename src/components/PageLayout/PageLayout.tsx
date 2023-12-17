import * as S from './style';

type Props = {
  children: React.ReactNode;
};


export default function PageLayout({children}: Props) {



  return (
    <S.Layout>
        <S.Wrapper>
        <S.HamburgerButton />
          {children}
        </S.Wrapper>
    </S.Layout>
  );
}
