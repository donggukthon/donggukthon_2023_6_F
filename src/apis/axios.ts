import axios from 'axios';
import Cookies from 'js-cookie';
//import useSetTokens from '../hooks/useSetTokens';

const getAccessTokenFromCookies = () => Cookies.get('accessCookie');
//const getRefreshTokenFromCookies = () => Cookies.get('refreshCookie');

export const instance = axios.create({
  baseURL: 'https://cleancity.shop', //TODO: 도메인 사면 수정
  headers: {
    Authorization: `Bearer ${getAccessTokenFromCookies()}`,
  },
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getAccessTokenFromCookies()}`;
    return config;
  },
  error => Promise.reject(error)
);
