import { ITrashesLocation } from "@/interfaces/trash";
import { atom } from "recoil";


export const trashCansState = atom<ITrashesLocation>({
    key: 'trashCansState',
    default: {
      data: {
        trashCans: []
      }
    }
  });