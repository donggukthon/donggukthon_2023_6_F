import React from 'react'
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps'
import ReportButton from '@/components/Button/ReportButton/ReportButton';
import * as S from './style';

function Home() {

  const handleCheckExistSenderContent = async () => {
    
  };

  return (
    <>
      <GoogleMaps />  
        <ReportButton margin="-200px 0 0 0" onClick={
          handleCheckExistSenderContent
        }>
          <S.ButtonText >{'제보하기'}</S.ButtonText>
        </ReportButton>

    </>
  )
}

export default Home;



