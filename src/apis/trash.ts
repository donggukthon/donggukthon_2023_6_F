import { instance } from './axios';
import { AxiosError } from 'axios';

//쓰레기 목록 읽기
export const getTrashCansList = async (page: number, size: number, latitude: number, logitude: number) => {
    try {
        const response = await instance.get(
            `/api/v1/users/trashs?page=${page}&size=${size}&latitude=${latitude}&logitude=${logitude}`,
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            //
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

        await instance.post('/api/v1/trashs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            //
        } 
    }
}

//쓰레기 상태변경
export async function updateTrash(trashId: string) {
    try {
        await instance.patch(`/api/v1/trashs/${trashId}`, {});
    } catch (error) {
        if (error instanceof AxiosError) {
            //
        }
    }
}