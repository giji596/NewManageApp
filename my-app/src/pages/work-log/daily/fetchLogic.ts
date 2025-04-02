import {
  DUMMY_DAILY_CATEGORY_LIST,
  DUMMY_DAILY_SUMMARY_DATA,
  DUMMY_MEMO_LIST,
} from "@/dummy/daily-page";

/**
 * DailyPageのフェッチ関連のロジック
 */
export default function DailyPageFetchLogic() {
  // TODO:SWRで取得
  const itemList = DUMMY_DAILY_SUMMARY_DATA;
  const isLoadingItemList = false;
  const detailData = {
    /** ここのidは元データのid(ナビゲート時に使用するため必須) */
    id: 0,
    categoryList: DUMMY_DAILY_CATEGORY_LIST,
    memoList: DUMMY_MEMO_LIST,
  };
  const isLoadingDetail = false;

  return {
    /** アイテム全体のリスト */
    itemList,
    /** アイテム全体(テーブルのやつ)のロード状態 */
    isLoadingItemList,
    /** ダイアログで表示する詳細データ */
    detailData,
    /** アイテム詳細(ダイアログのやつ)のロード状態 */
    isLoadingDetail,
  };
}
