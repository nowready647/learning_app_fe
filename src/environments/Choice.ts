export interface Choice {
    id: number | null;
    description: string;
    is_correct: boolean | number;
    inactive: Date | null;
}