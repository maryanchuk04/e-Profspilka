import api from "./config/axios.config";

const endpoint = 'advantage';

export const getAdvantages = () => api.get(endpoint);