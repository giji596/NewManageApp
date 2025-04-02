import {
  DUMMY_DAILY_CATEGORY_LIST,
  DUMMY_DAILY_SUMMARY_DATA,
  DUMMY_MEMO_LIST,
} from "@/dummy/daily-page";
import { useCallback, useRef } from "react";
import { yesterdayDate, yesterdayMonth, yesterdayYear } from "./dialog/params";

/**
 * DailyPageのフェッチ関連のロジック
 */
export default function DailyPageFetchLogic() {
  const detailDataParams = useRef<{ year: number; month: number; day: number }>(
    { year: yesterdayYear, month: yesterdayMonth, day: yesterdayDate }
  );
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

  // TODO:クエリパラメータを構成して、SWRでフェッチさせる
  const onFetchDetails = useCallback(
    (params: { year?: number; month?: number; day?: number }) => {
      const query = new URLSearchParams();
      // クエリパラメータのref値を変更
      if (params.year) detailDataParams.current.year = params.year;
      if (params.month) detailDataParams.current.month = params.month;
      if (params.day) detailDataParams.current.day = params.day;
      // クエリを変更
      query.set("year", String(detailDataParams.current.year));
      query.set("month", String(detailDataParams.current.month));
      query.set("day", String(detailDataParams.current.day));
      console.log("新しいクエリ", query.toString());
      // TODO:SWRでここでフェッチ
    },
    []
  );

  return {
    /** アイテム全体のリスト */
    itemList,
    /** アイテム全体(テーブルのやつ)のロード状態 */
    isLoadingItemList,
    /** ダイアログで表示する詳細データ */
    detailData,
    /** アイテム詳細(ダイアログのやつ)のロード状態 */
    isLoadingDetail,
    /** 詳細データ(ダイアログのやつ)のフェッチ関数 */
    onFetchDetails,
  };
}
