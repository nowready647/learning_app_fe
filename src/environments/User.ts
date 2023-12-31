export interface User {
    id: number;
    nick: string;
    email: string;
    password: string | null;
    accessToken: string | null;
}