import React from 'react';
import * as S from './style';

type Props = {
  address?: string;
  picture?: string;
  information?: string;
  complainCount?: number;
};

export default function Node({ address, picture, information, complainCount }: Props) {
    return (
        <S.Wrapper>
            <S.header>
              <S.left>
                <S.locationImage />
                {address}
              </S.left>
              <S.right>{'신고누적: ' + complainCount}</S.right>
            </S.header>
            <S.content>
              <S.Image imageUrl={picture} />
              <S.information>{information}</S.information>
            </S.content>
        </S.Wrapper>
    );
}
