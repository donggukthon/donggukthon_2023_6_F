import React, { useState } from 'react';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import Node from '@/components/Node/Node';
import { useQuery } from '@tanstack/react-query';
import { getTrashList } from '@/apis/trash';
import { userLocationInfoState } from '@/atoms/user';
import { useRecoilValue } from 'recoil';
import * as S from './style';

export default function TrashList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const userLocationInfo = useRecoilValue(userLocationInfoState);

  const { data } = useQuery({
    queryKey: ['trashList', currentPage],
    queryFn: () => getTrashList(currentPage, itemsPerPage, userLocationInfo.latitude, userLocationInfo.longitude),
  });

  const complaintList = data?.data.complaintList ?? [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <S.PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <S.PaginationButton
            key={index}
            isActive={currentPage === index + 1}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </S.PaginationButton>
        ))}
      </S.PaginationContainer>
    );
  };

  const trashImage = localStorage.getItem("trashImage")
  const trashContent = localStorage.getItem("trashContent")


  return (
    <PageLayoutGreen title={"신고게시판"}>
      <S.Info>{'깨끗한 환경을 향해 한 걸음'}</S.Info>
      <S.List>
        {complaintList.map((complaint, index) => (
          <S.ListItem key={index}>
            <Node 
                          address={"서울특별시 중구 동국대학교 혜화관"}
                          picture={trashImage}
              information={trashContent}
            />
          </S.ListItem>
        ))}
      </S.List>
      <Pagination
        totalItems={complaintList.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </PageLayoutGreen>
  );
}
