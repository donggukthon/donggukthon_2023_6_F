import React from "react";
import * as S from './style'
const Loading: React.FC = () => {
  return (
      <S.Wrapper>
        <S.SpinnerContainer>
          <S.Spinner />
        </S.SpinnerContainer>
      </S.Wrapper>
  );
};

export default Loading;