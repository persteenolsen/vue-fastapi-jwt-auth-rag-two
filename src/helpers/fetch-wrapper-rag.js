// fetch-wrapper-rag.js

import { useAuthStore } from '@/stores';

export const fetchWrapperRag = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {

        const { user } = useAuthStore();

        const headers = {
            'Content-Type': 'application/json',
            ...(user
                ? { Authorization: `Bearer ${user.access_token}` }
                : {})
        };

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        console.log("FETCH:", method, url, body);

        const response = await fetch(url, options);

        console.log("STATUS:", response.status);

        const data = await response.json();

        console.log("DATA:", data);

        if (!response.ok) {

            if ([401, 403].includes(response.status) && user) {
                useAuthStore().logout();
            }

            return Promise.reject(
                data?.detail ||
                data?.message ||
                response.statusText
            );
        }

        return data;
    };
}
