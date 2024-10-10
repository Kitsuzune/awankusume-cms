import { message } from 'antd';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL_CSM,
	withCredentials: true,
});

export async function apiRequest(
	method,
	url,
	data = {},
	params = {},
	responseType = 'json', // 'json', 'blob'
	fileUpload = false
) {
	try {
		const config = {
			method,
			url,
			headers: {},
			params,
			responseType,
		};

		const isFileUpload = Object.values(data).some(value => value instanceof File);

		if (isFileUpload || fileUpload) {
			const formData = new FormData();
			for (const key in data) {
				if (Array.isArray(data[key]) && data[key].every(item => typeof item === 'string')) {
					data[key].forEach((item, index) => {
						formData.append(`${key}[${index}]`, item);
					});

				} else if (Array.isArray(data[key])) {
					data[key].forEach((item, index) => {
						formData.append(key, item);
					});

				} else {
					console.log(key, data[key], 'tunnn');
					formData.append(key, data[key]);
				}
			}
			config.data = formData;
			config.headers['Content-Type'] = 'multipart/form-data';
		} else if (method !== 'get' && method !== 'delete') {
			config.data = data;
			config.headers['Content-Type'] = 'application/json';
		}

		let response = await apiClient(config);

		if (response.status === 200 || response.status === 201) {
			return response;
		}

	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				const refreshResponse = await apiClient.post('/auth/refresh');

				if (refreshResponse.status === 200) {
					const config = {
						method,
						url,
						headers: {},
						params,
						responseType,
					};

					const isFileUpload = Object.values(data).some(value => value instanceof File);

					if (isFileUpload) {
						const formData = new FormData();
						for (const key in data) {
							if (Array.isArray(data[key])) {
								data[key].forEach((item, index) => {
									formData.append(`${key}[${index}]`, item);
								});
							} else {
								formData.append(key, data[key]);
							}
						}
						config.data = formData;
						config.headers['Content-Type'] = 'multipart/form-data';
					} else if (method !== 'get' && method !== 'delete') {
						config.data = data;
						config.headers['Content-Type'] = 'application/json';
					}

					const response = await apiClient(config);

					if (response.status === 200 || response.status === 201) {
						return response;
					}
				}
			} catch (refreshError) {
				if (window.location.pathname !== '/web/login') {
					window.location.href = '/web/login';
				} else {
					message.error(refreshError.response.data.message);
				}
			}
		}

		if (error.response.status === 409 && error.response.data.message === "Unauthorized") {
			window.location.href = '/';
		}

		throw error;
	}
}