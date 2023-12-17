import * as S from './style';

type Props = {
  buttonImgSrc?: string;
};


export default function PageLayoutGreenBottom({buttonImgSrc}: Props) {

  return (
        <S.Wrapper>
          <S.BottomNavBar>
            {buttonImgSrc && <S.ImageButton src={buttonImgSrc} />} {/* 버튼 추가 */}
          </S.BottomNavBar>
        </S.Wrapper>
  );
}
