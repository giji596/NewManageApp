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
