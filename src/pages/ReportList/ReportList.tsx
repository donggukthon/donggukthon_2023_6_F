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

  return (
      <PageLayoutGreen title={"제보현황"}>
          <S.List>
              {trashCanList.map((trashCan, index) => (
                  <S.ListItem key={index}>
                      <Node 
                          address={trashCan.address}
                          picture={trashCan.picture}
                          information={trashCan.information}
                          complainCount={trashCan.complainCount}
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