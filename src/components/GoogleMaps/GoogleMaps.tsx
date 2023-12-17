import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import MyMarkerImg from '@/assets/Marker/MyMarker.png';
import * as S from './style';

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
        return new window.google.maps.Marker({
          position: location,
          map: map,
        });
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
    </>
  );
}

export default GoogleMaps;