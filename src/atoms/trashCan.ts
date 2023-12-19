import { ITrashCansLocation } from '@/interfaces/trashCans';
import { atom } from 'recoil';
import { ReportContentProps } from '@/interfaces/reportUpload';

export const trashCansState = atom<ITrashCansLocation>({
  key: 'trashCansState',
  default: {
    data: {
      trashCans: []
    }
  }
});

export const imageFileState = atom<File>({
  key: 'imageFileState',
  default: null, // 초기값을 null 또는 빈 문자열로 설정
});

export const contentState = atom<string>({
  key: 'contentState', // 고유한 key
  default: '',
});