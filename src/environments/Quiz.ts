import { Question } from "./Question";
import { User } from "./User";

export interface Quiz {
    id: number;
    title: string;
    description: string;
    user: User;
    questions: Array<Question>;
    solved: boolean;
    points: number | null;
    questionsCount: number | null;
    count: number | null;
}