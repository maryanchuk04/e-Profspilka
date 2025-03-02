import api from './config/api.config';

const endpoint = '/advantage';

export const getAdvantages = async () => {
    try {
        const advantages = await api.get(endpoint, { cache: '' });

        return advantages;
    }
    catch(err) {
        return [];
    }
};