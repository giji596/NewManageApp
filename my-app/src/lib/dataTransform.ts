/**
 * 概要
 * データ変換関連の汎用関数のまとめ
 *
 * 簡略リスト
 * createBooleanObject: string[] =>{string:boolean}
 */

/**
 * key名のstring配列をkey:falseに変換する関数 用途：チェックボックスメニューなど
 * @param keys キー名の配列
 * @returns key分の要素を持ち、すべての値がfalseのオブジェクト
 */
export const createBooleanObject = (
  keys: string[]
): Record<string, boolean> => {
  return keys.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};
