import axios from 'axios';
import { Task, LoginData, RegisterData, AuthResponse } from '../types';

const API_URL = 'http://127.0.0.1:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error('Response Error:', {
            message: error.message,
            response: error.response,
            request: error.request
        });
        
        // Handle unauthorized access
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
            return Promise.reject(new Error('Please log in again.'));
        }
        
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
};

export const taskAPI = {
    getTasks: async (): Promise<Task[]> => {
        const response = await api.get('/tasks/');
        return response.data;
    },

    createTask: async (task: Partial<Task>): Promise<Task> => {
        const response = await api.post('/tasks/', task);
        return response.data;
    },

    updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: number): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },
};
