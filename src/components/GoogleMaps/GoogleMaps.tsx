import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MyMarkerImg from '@/assets/Marker/MyMarker.png';
import * as S from './style';
import useModal from '@/hooks/useModal';
import TrashCanModal from '@/components/Modal/TrashCanModal/TrashCanModal';
import { userLocationInfoState } from '@/atoms/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { trashCansState } from '@/atoms/trashCan';
import { trashesState } from '@/atoms/trash';

import Loading from '../Loading/Loading';

const containerStyle = {
  width: '430px',
  height: '932px'
};

const OPTIONS = {
  minZoom: 4,
  maxZoom: 18,
};

const myMarkerIcon = {
  url: MyMarkerImg,
  scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
  anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
};

const trashCanMarkerIcon = {
  url: MyMarkerImg,
  scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
  anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
};

const trashMarkerIcon = {
  url: MyMarkerImg,
  scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
  anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
};

function GoogleMaps() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal(); // useModal 훅 사용
  const { isOpen : isTrashModalOpen, openModal : openTrashModal , closeModal : closeTrashModal } = useModal(); // useModal 훅 사용

  const [, setUserLocationInfo] = useRecoilState(userLocationInfoState); // Recoil 상태 사용
  const trashCans = useRecoilValue(trashCansState);
  const trashes = useRecoilValue(trashesState);
  const geocoder = useRef(new window.google.maps.Geocoder()).current; // Geocoder 객체 생성
  const [selectedTrashCanId, setSelectedTrashCanId] = useState(null);

  // 주소 가져오는 함수
  const getAddress = useCallback((location) => {
  geocoder.geocode({ location }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        setUserLocationInfo({
          address: results[0].formatted_address,
          latitude: location.lat,
          longitude: location.lng
        });
        openModal(); // 모달 열기
      } else {
        console.log('No results found');
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });
}, [setUserLocationInfo, openModal]); // 의존성 배열에 setUserLocationInfo와 openModal 추가

  useEffect(() => {
    if (!map) return;
    
    // Autocomplete 객체 생성 및 입력 필드에 연결
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.bindTo('bounds', map);
  
    // place_changed 이벤트 리스너 설정
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // 장소가 선택되지 않았을 경우
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // 상세 확대
      }
    });
  }, [map]);
  
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(newPos);
          // 여기에서 직접 마커 생성 로직 추가
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
  }, [map]); // map이 로드됐을 때만 실행
  
  useEffect(() => {
    if (center && map) {
      // 기존에 마커가 있다면 제거
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
        icon: myMarkerIcon
      });
      getAddress(location); // 사용자 주소 가져오기
      return () => {
        marker.setMap(null);
      };
    }
  }, [center, map]);
  
  useEffect(() => {
    if (map) {
      // 하드코딩된 마커 생성
      const hardcodedMarker = new window.google.maps.Marker({
        position: { lat: 37.5599867, lng: 126.993575 },
        map: map,
      });
  
      // 하드코딩된 마커 클릭 이벤트 리스너 추가
      hardcodedMarker.addListener('click', () => {
        getAddress({ lat: 37.5599867, lng: 126.993575 });
        openModal();
      });
  
      // 서버에서 받아온 데이터를 이용하여 마커 생성
      const trashCanMarkers = trashCans.data.trashCans.map(trashCan => {
        const trashCanMarker = new window.google.maps.Marker({
          position: { lat: trashCan.latitude, lng: trashCan.longitude },
          map: map,
        });
  
        // 서버 데이터 마커 클릭 이벤트 리스너 추가
        trashCanMarker.addListener('click', () => {
          getAddress({ lat: trashCan.latitude, lng: trashCan.longitude });
          setSelectedTrashCanId(trashCan.trashCanId); // 선택된 쓰레기통 ID 업데이트
          openModal(); // openModal에 trashCanId 전달
        });


  
        return trashCanMarker;
      });

      // 서버에서 받아온 데이터를 이용하여 마커 생성
      const trashMarkers = trashes.data.complaintList.map(trash => {
        const trashMarker = new window.google.maps.Marker({
          position: { lat: trash.latitude, lng: trash.longitude },
          map: map,
        });
                
        // 서버 데이터 마커 클릭 이벤트 리스너 추가
        trashMarker.addListener('click', () => {
          getAddress({ lat: trash.latitude, lng: trash.longitude });
          setSelectedTrashCanId(trash.trashId); // 선택된 쓰레기 ID 업데이트
          openModal(); // openModal에 trashId 전달
        });

        return trashMarker;
      });

      return () => {
        hardcodedMarker.setMap(null); // 하드코딩된 마커 제거
        trashCanMarkers.forEach(marker => marker.setMap(null)); // 서버 마커 제거
        trashMarkers.forEach(marker => marker.setMap(null)); // 서버 마커 제거
      };
    }
  }, [map, trashCans, trashes, openModal, getAddress]);
  
  const onLoad = React.useCallback((map: google.maps.Map) => {
    if (center) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  // 위치 정보가 로드되기 전까지 표시할 Fallback UI
  if (!center) {
    return <Loading/>;
  }

  return (
    <>
      <S.SearchInput
        ref={inputRef}
        type="text"
        placeholder="장소를 검색해주세요"
        onChange={handleSearchChange}
      />
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || undefined}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={OPTIONS}
      >
      </GoogleMap>

      {isOpen && (
        <TrashCanModal 
          isOpen={isOpen}
          onClose={closeModal}
          trashCanId={selectedTrashCanId} // TrashCanModal에 선택된 쓰레기통 ID 전달
        />
      )}
    </>
  );
}

export default GoogleMaps;