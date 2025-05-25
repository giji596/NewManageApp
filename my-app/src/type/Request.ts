/** ログの更新時のリクエストボディ */
export type UpdateUniqueTaskLogBody = {
  /** 更新先のタスクID */
  taskId?: number;
  /** 更新後の稼働時間 */
  workTime?: number;
  /** (タスクの)更新後の進捗 */
  progress?: number;
};

/** ログ作成時のリクエストボディ */
export type CreateDailyDetailDataBody = {
  /** タスクのid */
  taskId: number;
};

/** タスク更新時のリクエストボディ */
export type UpdateTaskBody = {
  /** タスクの名前 */
  taskName?: string;
  /** タスクの所属するカテゴリのid */
  categoryId?: number;
  /** タスクがお気に入りか否か */
  isFavorite?: boolean;
  /** タスクの進捗 */
  progress?: number;
};

/** タスク作成時のリクエストボディ */
export type CreateTaskBody = {
  /** タスクの名前 */
  name: string;
  /** タスクの所属するカテゴリのid */
  categoryId: number;
  /** タスクがお気に入りか否か */
  isFavorite: boolean;
};

/** タスクの一括更新時のリクエストボディ */
export type BulkUpdateTaskBody = {
  /** タスクのid */
  id: number;
  /** 更新後の進捗 */
  progress?: number;
  /** 更新後のお気に入り */
  isFavorite?: boolean;
}[];

/** カテゴリ作成時のリクエストボディ */
export type CreateCategoryBody = {
  /** カテゴリの名前 */
  name: string;
};

/** メモ更新時のリクエストボディ */
export type UpdateMemoBody = {
  /** メモの新しいタイトル */
  title?: string;
  /** メモの新しい本文 */
  text?: string;
  /** メモに設定するタグのid */
  tagId?: number;
};

/** メモ作成時のリクエストボディ */
export type CreateMemoBody = {
  /** メモのタイトル */
  title: string;
  /** メモの本文 */
  text: string;
  /** ログのID */
  taskLogId: number;
  /** メモに設定するタグのid */
  tagId?: number;
};
