import { ITrashesLocation } from "@/interfaces/trash";
import { atom } from "recoil";


export const trashesState = atom<ITrashesLocation>({
    key: 'trashesState',
    default: {
      data: {
        complaintList: []
      }
    }
  });