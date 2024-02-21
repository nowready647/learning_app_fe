import * as moment from "moment";
import { User } from "./User";

export interface Message {
    id: number;
    id_question: number | null;
    id_creator: number | null;
    title: string;
    content: string;
    solved: number;
    date_add: string;
    count: number;
    user: User;
    answers: Array<Message> | null;
}