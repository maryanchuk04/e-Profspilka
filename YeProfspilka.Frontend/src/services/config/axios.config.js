import axios, { AxiosError } from 'axios';

export const api = axios.create({
	baseURL: "url"
})

const errorHandler = (error) => {
	const statusCode = error.response?.status

	if (error.code === AxiosError.ERR_CANCELED) {
		// alert should be here
		return Promise.resolve()
	}

	if (statusCode && statusCode !== 401) {
		console.error(error)
	}

	return Promise.reject(error)
}

// error handler
api.interceptors.response.use(undefined, (error) => {
	return errorHandler(error)
})