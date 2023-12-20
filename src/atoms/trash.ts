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

export const imageFileState = atom<File>({
    key: 'imageFileState',
    default: null, // 초기값을 null 또는 빈 문자열로 설정
});

export const imageUrlState = atom<string>({
    key: 'imageUrlState', // 고유한 key
    default: '', // 초기값
});