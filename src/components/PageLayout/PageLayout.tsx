import React, { useState } from 'react';
import * as S from './style';
import SideBar from '@/components/SideBar/SideBar'

type Props = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // 사이드바 상태 관리

  const handleHamburgerClick = () => {
    setIsSideBarOpen(!isSideBarOpen); // 사이드바 표시 상태 토글
  };

  return (
    <S.Layout>
      <S.Wrapper>
        <S.NavBar />
        <S.HamburgerButton onClick={handleHamburgerClick} /> {/* 클릭 이벤트 핸들러 추가 */}
        {children}
      </S.Wrapper>
      <SideBar isOpen={isSideBarOpen} onCloseClick={() => setIsSideBarOpen(false)} /> {/* SideBar 컴포넌트에 상태 전달 */}
    </S.Layout>
  );
}
