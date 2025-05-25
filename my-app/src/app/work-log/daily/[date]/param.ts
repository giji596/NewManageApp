import { ERROR_PAGE_ID } from "@/constant/errorPages";
import { localClient } from "@/lib/localClient";
import { ReplaceDateWithString } from "@/type/common";
import { DateDetailPage } from "@/type/Date";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

/**
 * 日付詳細ページのパラメータ関連
 */
export default function DailyDetailPageParams() {
  const { date: dateParam } = useParams<{ date: string }>();
  const { data } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  const rawData: ReplaceDateWithString<DateDetailPage> = useMemo(
    () =>
      data ?? {
        // dataない時は空データ渡す(一応isLoadingで表示しないようにしてるはずなのでいらないと思うけど)
        date: dateParam,
        taskList: [],
        memoList: [],
      },
    [data, dateParam]
  );

  const taskList = rawData?.taskList;

  // 状態管理
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const selectedItemTaskId = useMemo(() => {
    const target = taskList.find((item) => item.id === selectedItemId);
    if (target) return target.task.id;
    return ERROR_PAGE_ID;
  }, [selectedItemId, taskList]);
  // タスクの一覧に変更があった場合(SWRで再フェッチが行われるタイミング)、選択を解除する
  useEffect(() => {
    setSelectedItemId(null);
    // 長さが変わった場合のみ(create/delete)選択を解除させる
  }, [taskList.length]);
  // ローカル--------------------------------------------------
  const doSelectItem = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  const doDeselectItem = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  // -----------------------------------------------------------

  const handleSelectItem = useCallback(
    (id: number) => {
      // アイテムが選択中のアイテムと一致する場合
      // 選択の解除を行う
      if (selectedItemId === id) {
        doDeselectItem();
      } else {
        // 選択中のアイテムでない場合
        // 選択中のアイテムを変更する
        doSelectItem(id);
      }
    },
    [doDeselectItem, doSelectItem, selectedItemId]
  );

  return {
    /** 選択中のアイテムID */
    selectedItemId,
    /** 選択中のタスクID(メモのハイライト用) */
    selectedItemTaskId,
    /** アイテムを選択するハンドラー */
    handleSelectItem,
  };
}
