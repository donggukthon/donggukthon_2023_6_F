import React, { useMemo } from "react";
import * as S from './style'
import { useNavigate } from "react-router-dom";
import { SideBarProps } from "@/interfaces/sideBar";

const SideBar: React.FC<SideBarProps> = ({ onCloseClick, isOpen }) => {
    const navigate = useNavigate();

    const handleMenuClick = (path: string) => {
        navigate(path);
        onCloseClick();
    };

    const menuItems = useMemo(
        () => [
        { menuName: "제보현황", path: "/report/list" },
        { menuName: "신고게시판", path: "/trash/noticeboard" },
        ],
        []
    );

    return (
        <S.Container>
            {isOpen && (
                <S.Overlay $show={isOpen} onClick={onCloseClick} />
            )}            
            <S.MainSection $isOpenProps={isOpen}>
                <S.MenuList>
                    {menuItems.map((menu) => (
                        <S.MenuItem
                            onClick={() => handleMenuClick(menu.path)}
                        >
                            {menu.menuName}
                        </S.MenuItem>
                    ))}
                </S.MenuList>
            </S.MainSection>
        </S.Container>
    );
};

export default SideBar;
