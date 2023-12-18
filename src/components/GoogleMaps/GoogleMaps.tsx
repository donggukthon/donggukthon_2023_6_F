import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MyMarkerImg from '@/assets/Marker/MyMarker.png';
import * as S from './style';
import useModal from '@/hooks/useModal';
import TrashCanModal from '@/components/Modal/TrashCanModal/TrashCanModal';

const containerStyle = {
  width: '430px',
  height: '932px'
};

const OPTIONS = {
  minZoom: 4,
  maxZoom: 18,
};

const markerIcon = {
    url: MyMarkerImg,
    scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기 조절
    anchor: new window.google.maps.Point(25, 25), // 마커 이미지의 중심점을 설정
  };

function GoogleMaps() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal(); // useModal 훅 사용
  const [address, setAddress] = useState(''); // 주소 상태

  // Geocoder 객체 생성
  const geocoder = useRef(new window.google.maps.Geocoder()).current;

  // 주소 가져오는 함수
  const getAddress = (location) => {
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address); // 첫 번째 결과의 주소 설정
          openModal(); // 모달 열기
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

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
        icon: markerIcon
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
      const hardcodedMarkers = [
        { lat: 37.5599867, lng: 126.993575 },
        { lat: 37.5609867, lng: 126.993575 },
        { lat: 37.5599867, lng: 126.992575 }
      ];
      const markers = hardcodedMarkers.map(location => {
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
        });

        // 마커 클릭 이벤트 리스너
        marker.addListener('click', () => {
          openModal(); // isTrashUploadPage가 true일 때 모달 열기
        });

        return marker;
      });
      return () => {
        markers.forEach(marker => marker.setMap(null));
      };
      
    }
  }, [map]);

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
    return <>Loading location...</>;
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
          modalTitle={'서울특별시 중구 필동로 1길 30'} //TODO : 서버로 받은 데이터 넣어야함
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default GoogleMaps;