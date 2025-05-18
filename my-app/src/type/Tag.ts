/** タグの選択欄の型定義*/
export type TagOption = {
  /** 識別用のid */
  id: number;
  /** タグ名 */
  name: string;
};

/** タグ編集時リストアイテムの型定義 */
export type TagEditListItem = {
  /** 識別用のid */
  id: number;
  /** タグ名 */
  name: string;
  /** 利用中かどうか(警告メッセージ用) */
  isUsed: boolean;
};

/** タグの使用状況 */
export type TagUsage = {
  /** 使用先のメモタイトル名の配列(最大で5件まで) */
  memoTitles: string[];
  /** 使用先の数 */
  usageCount: number;
};
