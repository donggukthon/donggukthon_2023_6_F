import { instance } from './axios';
import { AxiosError } from 'axios';

export async function declarationsNoTrashCan(data: { trashCanId: string }) {
    try {
        const response = await instance.post('/api/v1/declarations', {
            trashCanId: data.trashCanId
        });
        return {
            status: response.status //200
        };

    } catch (error) {
        if (error instanceof AxiosError) {
            // Axios 오류 처리
            return {
                status: error.response?.status, //404, 400
            };
        } else {
            // 기타 오류 처리
            return { status: 500, message: 'Unknown error occurred' };
        }
    }
}
