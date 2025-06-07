export interface UserLogin {
    id: number;
    role: string;
    username: string;
    email: string;
    phone_number: string;
}

export interface UserLoginResponse {
    user: UserLogin;
    token: string;
}
