import React from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './style';

type Props = {
  address?: string;
  picture?: string;
  information?: string;
  complainCount?: number;
};

export default function Node({ address, picture, information, complainCount }: Props) {
  const location = useLocation();

  // '/report/list' 경로인지 확인
  const isReportListPage = location.pathname === '/report/list';

  return (
    <S.Wrapper>
      <S.header>
        <S.left>
          <S.locationImage />
          {address}
        </S.left>
        {isReportListPage && <S.right>{'신고누적: ' + complainCount}</S.right>}
      </S.header>
      <S.content>
        <S.Image imageUrl={picture} />
        <S.information>{information}</S.information>
      </S.content>
    </S.Wrapper>
  );
}
