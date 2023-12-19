import { IUserLocationInfoState } from './../interfaces/user';
import { atom } from 'recoil';

export const userLocationInfoState = atom<IUserLocationInfoState>({
  key: 'userLocationInfoState', // 고유한 키
  default: {
    address: '대한민국',
    latitude: 0,
    longitude: 0
  },
});
