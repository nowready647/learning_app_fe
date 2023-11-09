import { Question } from "./Question";
import { User } from "./User";

export interface Quiz {
    id: number;
    title: string;
    description: string;
    user: User;
    questions: Array<Question>;
}