export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    username: string;
    token: string;
}

export interface AuthResponse {
    access_token: string;
    username: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData extends LoginData {}
