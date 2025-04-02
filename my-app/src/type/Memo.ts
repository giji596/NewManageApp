/** タイトルとidだけのメモのデータ型 */
export type MemoTitleList = {
  /** 識別用のid */
  id: number;
  /** メモのタイトル */
  title: string;
};

/** メモの一覧データ型 */
export type MemoSummary = {
  /** 識別用のid */
  id: number;
  /** メモのタイトル */
  title: string;
  /** メモの日付 */
  date: Date;
  /** メモに関連するタスク名 */
  taskName: string;
  /** タグ(任意) */
  tag?: string;
};

/** メモの詳細データの型定義 */
export type MemoDetail = {
  /** 識別用のid */
  id: number;
  /** メモのタイトル */
  title: string;
  /** メモの日付 */
  date: Date;
  /** メモに関連するタスク名 */
  taskName: string;
  /** タグ(任意) */
  tag?: string;
  /** メモの本文 */
  text: string;
};
