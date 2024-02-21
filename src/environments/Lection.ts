import { SafeHtml } from "@angular/platform-browser";

export interface Lection {
    id: number;
    id_quiz: number | null;
    title: string;
    content: string;
    contentHtml: SafeHtml;
}