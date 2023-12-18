import React from 'react'
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps'
import ReportButton from '@/components/Button/ReportButton/ReportButton';
import TrashComplaintButton from '@/components/Button/TrashComplaintButton/TrashComplaintButton';
import * as S from './style';
import PageLayout from '@/components/PageLayout/PageLayout';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();

  const handleNavigateReport = () => {
      navigate('/report')
  }

  const handleNavigateTrash = () => {
    navigate('/trash')
}

  return (
    <PageLayout>
      <GoogleMaps />  
        <TrashComplaintButton margin="110px 0 0 250px" 
        onClick={() =>
          handleNavigateTrash()
        } 
        />

        <ReportButton margin="-200px 0 0 0" 
        onClick={() =>
          handleNavigateReport()
        }>
          <S.ButtonText >{'제보하기'}</S.ButtonText>
        </ReportButton>


    </PageLayout>
  )
}

export default Home;



