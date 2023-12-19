import React from 'react'
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import Node from '@/components/Node/Node';
import * as S from './style'

export default function TrashList() {
  const NodeList = [<Node />, <Node/>];

  return (
    <PageLayoutGreen title={"신고게시판"}>
      <S.Info>{'깨끗한 환경을 만듭시다~'}</S.Info>
      <ul style={{listStyleType: 'none', paddingLeft: 0, margin: 0}}>
        {NodeList.map((item, index) => 
          <li key={index} style={{marginBottom: '10px'}}>{item}</li>)}
      </ul>
    </PageLayoutGreen>
  );
}
