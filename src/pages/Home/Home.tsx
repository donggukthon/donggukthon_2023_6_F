import React, { useEffect } from 'react'
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps'
import ReportButton from '@/components/Button/ReportButton/ReportButton';
import TrashComplaintButton from '@/components/Button/TrashComplaintButton/TrashComplaintButton';
import * as S from './style';
import PageLayout from '@/components/PageLayout/PageLayout';
import { useNavigate } from 'react-router-dom';
import { getTrashCansLocation } from '@/apis/trashCan';
import {useQuery} from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { ITrashCansLocation } from '@/interfaces/trashCans';
import { trashCansState } from '@/atoms/trashCan';
import { userLocationInfoState } from '@/atoms/user';

function Home() {
  const navigate = useNavigate();
  const [, setTrashCans] = useRecoilState(trashCansState);
  const [userLocationInfo] = useRecoilState(userLocationInfoState);

  const {data} = useQuery<ITrashCansLocation>({
    queryKey: ['trashCansLocation'],
    queryFn: () => getTrashCansLocation(userLocationInfo.latitude, userLocationInfo.longitude),
  });

  useEffect(() => {
    if (data) {
      setTrashCans(data);
    }
  }, [data, setTrashCans]);
  
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



