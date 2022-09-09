import { ClientResponse, ClientApiResponse, ClientResponseError } from 'types';
import { HOST_ADDRESS } from "../config";
import { deleteLocalStorage, getLocalStorage } from './localStorageHelper';

type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

interface ResponseProblem {
    message: string;
    problems?: string[];
}

type UploadMethod = 'POST' | 'PATCH' | 'PUT';

const showProblem = (response: Response, res: ResponseProblem): ClientResponseError => {
    console.warn(res.message);
    if (response.status === 403) {
        deleteLocalStorage('token');
        // Nie wiem jak zrobić aktualizację kontekstu w utilsie...
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        //
    }
    if (response.status === 400) return { message: res.message, status: false, problems: res.problems };
    return { message: res.message, status: false };
};

export const fetchTool = async (path: string, method: Method = 'GET', body: any = undefined): Promise<ClientResponse> => {
    try {
        const headers = ['POST', 'PATCH', 'PUT'].includes(method) ? { 'Content-Type': 'application/json', 'authorization': getLocalStorage('token') } : undefined;

        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            method,
            headers: headers || {
                'authorization': getLocalStorage('token'),
            },
            body: body && JSON.stringify(body),
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export const fetchApiTool = async (path: string): Promise<ClientApiResponse> => {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export const fetchWithFileUpload = async (path: string, method: UploadMethod = 'POST', body: FormData): Promise<ClientResponse> => {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            method,
            headers: {
                'authorization': getLocalStorage('token'),
            },
            body,
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (error) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
}
