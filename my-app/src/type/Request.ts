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
