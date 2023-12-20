import { instance } from './axios';
import { AxiosError } from 'axios';

//쓰레기통 신고하기
export async function declarationsNoTrashCan(trashCanId: number) {
    try {
        const response = await instance.post('/api/v1/declarations', {
            trashCanId: trashCanId
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

//(사용자 종속) 쓰레기통 목록 읽기
export const getTrashCansList = async (page: number, size: number) => {
    try {
        const response = await instance.get(
            `/api/v1/users/trashCans?page=${page}&size=${size}`,
        );
        return response.data.data.reportList;
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

//쓰레기통 등록
export async function TrashCanReport(data: {
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

        await instance.post('/api/v1/trashCans', formData, {
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

//쓰레기통 목록 읽기(위치별)
export const getTrashCansLocation = async (latitude: number, longitude: number) => {
    try {
        const response = await instance.get(
            `/api/v1/thashCans?latitude=${latitude}&longitude=${longitude}`,
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