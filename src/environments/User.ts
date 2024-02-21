export interface User {
    id: number | null;
    nick: string;
    email: string;
    password: string | null;
    accessToken: string | null;
}