import { ITrashCansLocation } from '@/interfaces/trashCans';
import { atom } from 'recoil';

export const trashCansState = atom<ITrashCansLocation>({
  key: 'trashCansState',
  default: {
    data: {
      trashCans: []
    }
  }
});
