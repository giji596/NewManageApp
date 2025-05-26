import { localClient } from "@/lib/localClient";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

type Props = {
  /** 選択中のタスクのid(ハイライトように) */
  selectedItemTaskId: number;
};

/**
 * 日付詳細 - メモリストのロジック部分
 */
export default function MemoListLogic({ selectedItemTaskId }: Props) {
  // データフェッチ
  const { date: dateParam } = useParams<{ date: string }>();
  const { data, isLoading } = useSWR(
    `api/work-log/daily/${dateParam}`,
    localClient.work_log.daily._date(dateParam).get()
  );
  const memoItemList = useMemo(() => data?.memoList ?? [], [data]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleClickRow = useCallback(
    (id: number) => {
      if (selectedRowId === id) {
        setSelectedRowId(null);
      } else {
        setSelectedRowId(id);
      }
    },
    [selectedRowId]
  );

  const backgroundColor = useCallback(
    // ハイライト時には薄い青色 (選択時はselectedによって上書きされるので注意)
    (row: MemoDailyTask) =>
      selectedItemTaskId === row.task.id ? "table.highlighted" : "",
    [selectedItemTaskId]
  );
  return {
    /** メモ一覧 */
    memoItemList,
    /** メモのローディング状態 */
    isLoading,
    /** 選択中のid */
    selectedRowId,
    /** 行をクリックした際のハンドラー
     * 指定した行をActiveにする
     * すでにActiveなら非Activeにする
     */
    handleClickRow,
    /** 背景色 */
    backgroundColor,
  };
}
