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
