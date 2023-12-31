import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MyMarkerImg from '@/assets/Marker/MyMarker.png';
import TrashCanMarkerImg from '@/assets/Marker/TrashCanMarker.png';
import TrashMarkerImg from '@/assets/Marker/TrashMarker.png';

import * as S from './style';
import useModal from '@/hooks/useModal';
import TrashCanModal from '@/components/Modal/TrashCanModal/TrashCanModal';
import { userLocationInfoState } from '@/atoms/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { trashCansState } from '@/atoms/trashCan';
import { trashesState } from '@/atoms/trash';

import Loading from '../Loading/Loading';
import TrashModal from '../Modal/TrashModal/TrashModal';

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
  url: TrashCanMarkerImg,
  scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
  anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
};

const trashMarkerIcon = {
  url: TrashMarkerImg,
  scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
  anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
};

function GoogleMaps() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const { isOpen : isTrashCanModalOpen, openModal : openTrashCanModal, closeModal : closeTrashCanModal } = useModal(); // useModal 훅 사용
  const { isOpen : isTrashModalOpen, openModal : openTrashModal , closeModal : closeTrashModal } = useModal(); // useModal 훅 사용

  const [, setUserLocationInfo] = useRecoilState(userLocationInfoState); // Recoil 상태 사용
  const trashCans = useRecoilValue(trashCansState);
  const trashes = useRecoilValue(trashesState);
  const geocoder = useRef(new window.google.maps.Geocoder()).current; // Geocoder 객체 생성
  const [selectedTrashCanId, setSelectedTrashCanId] = useState(null);
  const [selectedTrashId, setSelectedTrashId] = useState(null);

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
        localStorage.setItem("trashAddress", results[0].formatted_address);
        localStorage.setItem("trashCanAddress", results[0].formatted_address);

      } else {
        console.log('No results found');
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });
}, [setUserLocationInfo]); // 의존성 배열에 setUserLocationInfo와 openModal 추가

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

        localStorage.setItem("trashLatitude", newPos.lat.toString());
        localStorage.setItem("trashLongitude", newPos.lng.toString());

        localStorage.setItem("trashCanLatitude", newPos.lat.toString());
        localStorage.setItem("trashCanLongitude", newPos.lng.toString());
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
        openTrashModal();
      });
  
      // // 서버에서 받아온 데이터를 이용하여 마커 생성
      // const trashCanMarkers = trashCans.data.trashCans.map(trashCan => {
      //   const trashCanMarker = new window.google.maps.Marker({
      //     position: { lat: trashCan.latitude, lng: trashCan.longitude },
      //     map: map,
      //     icon: trashCanMarkerIcon,
      //   });
  
      //   // 서버 데이터 마커 클릭 이벤트 리스너 추가
      //   trashCanMarker.addListener('click', () => {
      //     getAddress({ lat: trashCan.latitude, lng: trashCan.longitude });
      //     setSelectedTrashCanId(trashCan.trashCanId); // 선택된 쓰레기통 ID 업데이트
      //     openTrashCanModal(); // openModal에 trashCanId 전달
      //   });
      const trashLatitude = Number(localStorage.getItem("trashLatitude"));
      const trashLongitude = Number(localStorage.getItem("trashLongitude"));
      const trashCanLatitude = Number(localStorage.getItem("trashCanLatitude"));
      const trashCanLongitude = Number(localStorage.getItem("trashCanLongitude"));
            // 서버에서 받아온 데이터를 이용하여 마커 생성
              const trashCanMarker = new window.google.maps.Marker({
                position: { lat: trashCanLatitude+0.0001, lng: trashCanLongitude+0.0001 },
                map: map,
                icon: trashCanMarkerIcon,
              });
        
              // 서버 데이터 마커 클릭 이벤트 리스너 추가
              trashCanMarker.addListener('click', () => {
                getAddress({ lat: trashCanLatitude+0.0001, lng: trashCanLongitude+0.0001 });
                openTrashCanModal(); // openModal에 trashCanId 전달
              });

   // 서버에서 받아온 데이터를 이용하여 마커 생성
   const trashMarker = new window.google.maps.Marker({
    position: { lat: trashLatitude-0.0001, lng: trashLongitude-0.0001 },
    map: map,
    icon: trashMarkerIcon,
  });

  // 서버 데이터 마커 클릭 이벤트 리스너 추가
  trashMarker.addListener('click', () => {
    getAddress({ lat: trashLatitude-0.0001, lng: trashLongitude-0.0001 });
    openTrashModal(); // openModal에 trashCanId 전달
  });
      

      // // 서버에서 받아온 데이터를 이용하여 마커 생성
      // const trashMarkers = trashes.data.complaintList.map(trash => {
      //   const trashMarker = new window.google.maps.Marker({
      //     position: { lat: trash.latitude, lng: trash.longitude },
      //     map: map,
      //     icon: trashMarkerIcon,
      //   });
                
      //   // 서버 데이터 마커 클릭 이벤트 리스너 추가
      //   trashMarker.addListener('click', () => {
      //     getAddress({ lat: trash.latitude, lng: trash.longitude });
      //     setSelectedTrashId(trash.trashId); // 선택된 쓰레기 ID 업데이트
      //     openTrashModal(); // openModal에 trashId 전달
      //   });

      //   return trashMarker;
      // });

      return () => {
        hardcodedMarker.setMap(null); // 하드코딩된 마커 제거
        //trashCanMarkers.forEach(marker => marker.setMap(null)); // 서버 마커 제거
        //trashMarkers.forEach(marker => marker.setMap(null)); // 서버 마커 제거
        trashCanMarker.setMap(null); // 하드코딩된 마커 제거
        trashMarker.setMap(null); // 하드코딩된 마커 제거
      };
    }
  }, [map, trashCans, trashes, openTrashCanModal, openTrashModal, getAddress]);
  
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

      {isTrashCanModalOpen && (
        <TrashCanModal 
          isOpen={isTrashCanModalOpen}
          onClose={closeTrashCanModal}
          trashCanId={selectedTrashCanId} // TrashCanModal에 선택된 쓰레기통 ID 전달
        />
      )}

      {isTrashModalOpen && (
        <TrashModal 
          isOpen={isTrashModalOpen}
          onClose={closeTrashModal}
          trashId={selectedTrashId} // TrashModal에 선택된 쓰레기통 ID 전달
        />
      )}
    </>
  );
}

export default GoogleMaps;