import { atom } from 'recoil';

export const userLocationInfoState = atom({
  key: 'userLocationInfoState', // 고유한 키
  default: {
    address: '',
    latitude: null,
    longitude: null
  },
});
