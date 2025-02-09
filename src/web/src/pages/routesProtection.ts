import { getAccessToken } from '@/apis/token';

export const authorizeProtection = () => getAccessToken() === null;
