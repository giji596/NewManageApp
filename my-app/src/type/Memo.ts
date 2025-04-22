import { TaskOption } from "./Task";

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

/** 日付タスクに付随するメモ */
export type MemoDailyTask = {
  /** 識別用のid */
  id: number;
  /** メモのタイトル */
  title: string;
  /** メモの本文の頭の方だけ */
  summary: string;
  /** 関連する日付のタスク */
  task: TaskOption;
};

export type MemoTaskDetail = {
  /** 識別用のid */
  id: number;
  /** 書いた日付 */
  date: Date;
  /** メモのタイトル */
  title: string;
  /** タグ(任意) */
  tag: string;
  /** メモの本文の頭の方だけ */
  summary: string;
};
