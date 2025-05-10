/**
 * BEからFEに送信するようのDate -> stringに変換する型
 * Tに元typeを入れて実装
 */
export type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends object
    ? ReplaceDateWithString<T[K]> // ← 再帰で中も見に行く
    : T[K];
};

/** 日付セレクト用　初期値のパラメータ型 */
export type DateSelectInitValues = {
  initYear: number;
  initMonth: number;
  initDay: number;
};
