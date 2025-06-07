export interface Role {
    id: number;
    name: string;
    is_active: boolean;
}

export interface User {
    id: number;
    role_id: number;
    name: string;
    email: string;
    username: string;
    phone_number: string;
    is_active: boolean;
}

export interface UserWithRole extends User {
    role: Role;
}
