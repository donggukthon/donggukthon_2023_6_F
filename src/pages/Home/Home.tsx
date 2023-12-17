import React from 'react'
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps'
import ReportButton from '@/components/Button/ReportButton/ReportButton';
import * as S from './style';
import PageLayout from '@/components/PageLayout/PageLayout';
import { useNavigate } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/report')
  }

  return (
    <PageLayout>
      <GoogleMaps />  
        <ReportButton margin="-200px 0 0 0" 
        onClick={() =>
          handleNavigate()
        }>
          <S.ButtonText >{'제보하기'}</S.ButtonText>
        </ReportButton>

    </PageLayout>
  )
}

export default Home;



