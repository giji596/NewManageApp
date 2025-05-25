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
