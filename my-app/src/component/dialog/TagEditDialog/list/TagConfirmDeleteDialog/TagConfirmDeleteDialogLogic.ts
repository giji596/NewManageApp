/**
 * タグの削除時の確認ダイアログのロジック
 */
export const TagConfirmDeleteDialogLogic = () => {
  const memoTitleList = ["メモ1", "メモ2", "メモ3", "メモ4", "メモ5"]; // TODO: 実際はフェッチ 0~5件取ってくる
  const usedCount = 8; // TODO:実際はフェッチ ここで利用されている箇所の数を取得する
  const hideItemCount = usedCount - 5;
  return {
    /** タグを使ってるメモタイトル一覧(0~5件まで) */
    memoTitleList,
    /** 非表示になってるアイテムの数(他x件で表示) */
    hideItemCount,
  };
};
