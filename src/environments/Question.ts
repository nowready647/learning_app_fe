import { Choice } from "./Choice";

export interface Question {
    id: number;
    id_quiz: number;
    question: string;
    description: string;
    input_type: string;
    choice: Array<Choice>;
    inactive: Date | null;
}