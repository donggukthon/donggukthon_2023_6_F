import { instance } from './axios';
import { AxiosError } from 'axios';

//쓰레기 목록 읽기
export const getTrashList = async (page: number, size: number, latitude: number, logitude: number) => {
    try {
        const response = await instance.get(
            //`/api/v1/users/trashs?page=${page}&size=${size}&latitude=${latitude}&logitude=${logitude}`,
            `/trash/trashs/`,
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // 오류를 다시 던져 useMutation의 onError 콜백이 호출되도록 함
            throw error;
        } else {
            // 기타 오류를 다시 던짐
            throw new Error('An error occurred while reporting trash can');
        }
    }
};

//쓰레기 목록 읽기(지도마커 용)
export const getTrashListForMarker = async (latitude: number, logitude: number) => {
    try {
        const response = await instance.get(
            //`/api/v1/users/trashs?latitude=${latitude}&logitude=${logitude}`,
        "/trash/list/",
            );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // 오류를 다시 던져 useMutation의 onError 콜백이 호출되도록 함
            throw error;
        } else {
            // 기타 오류를 다시 던짐
            throw new Error('An error occurred while reporting trash can');
        }
    }
};

//쓰레기 등록
export async function TrashComplaint(data: {
    address: string,
    latitude: number,
    longitude: number,
    picture: File, 
    information: string
}) {
    try {
        const formData = new FormData();
        formData.append('address', data.address);
        formData.append('latitude', data.latitude.toString());
        formData.append('longitude', data.longitude.toString());
        formData.append('picture', data.picture);
        formData.append('information', data.information);

        await instance.post('/trash/create/', formData, { //api/v1/trashs
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            // 오류를 다시 던져 useMutation의 onError 콜백이 호출되도록 함
            throw error;
        } else {
            // 기타 오류를 다시 던짐
            throw new Error('An error occurred while reporting trash can');
        }
    }
}

//쓰레기 상태변경
export async function cleanTrash(trashId: number) {
    try {
        await instance.delete(`trash/delete/${trashId}/`, {}); ///api/v1/trashs/${trashId}
    } catch (error) {
        if (error instanceof AxiosError) {
            // 오류를 다시 던져 useMutation의 onError 콜백이 호출되도록 함
            throw error;
        } else {
            // 기타 오류를 다시 던짐
            throw new Error('An error occurred while reporting trash can');
        }
    }
}