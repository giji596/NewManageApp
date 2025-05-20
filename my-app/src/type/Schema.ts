// Prismaスキーマに対応する型定義
export interface DailyData {
  date: string; // ISO文字列でDateを表現
}

export interface TaskLog {
  id: number;
  taskId: number;
  date: string;
  workTime: number;
}

export interface Task {
  id: number;
  name: string;
  categoryId: number;
  progress: number;
  isFavorite: boolean;
  firstActivityDate?: string;
  lastActivityDate?: string;
}

export interface Category {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface Memo {
  id: number;
  title: string;
  text: string;
  taskLogId: number;
  tagId?: number;
}

export interface MemoTag {
  id: number;
  name: string;
}
