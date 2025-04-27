/**
 * BEからFEに送信するようのDate -> stringに変換する型
 * Tに元typeを入れて実装
 */
export type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
