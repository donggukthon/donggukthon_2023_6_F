import React, { useState } from 'react';
import PageLayoutGreen from '@/components/PageLayoutGreen/PageLayoutGreen';
import Node from '@/components/Node/Node';
import { useQuery } from '@tanstack/react-query';
import { getTrashCansList } from '@/apis/trashCan';
import * as S from './style'

export default function ReportList() {
  const [currentPage, setCurrentPage] = useState(1); //TODO: Recoil
  const itemsPerPage = 5;

  const { data } = useQuery({
      queryKey: ['trashCanList', currentPage],
      queryFn: () => getTrashCansList(currentPage, itemsPerPage),
  });

  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  const totalItems = Array.isArray(data) ? data.length : 0;
  const trashCanList = Array.isArray(data) ? data : [];

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

  const trashCanImage = localStorage.getItem("trashCanImage")
  const trashCanContent = localStorage.getItem("trashCanContent")

  return (
      <PageLayoutGreen title={"제보현황"}>
          <S.List>
              {trashCanList.map((trashCan, index) => (
                  <S.ListItem key={index}>
                      <Node 
                          address={"서울특별시 중구 동국대학교 혜화관"}
                          picture={trashCanImage}
                          information={trashCanContent}
                          complainCount={0}
                      />
                  </S.ListItem>
              ))}
          </S.List>
          <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
          />
      </PageLayoutGreen>
  );
}