import { localClient } from "@/lib/localClient";
import { MemoDailyTask } from "@/type/Memo";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import useSWR from "swr";

type Props = {
  /** 選択中のタスクのid(ハイライトように) */
  selectedItemTaskId: number;
  /** ダイアログ(編集)開くよう */
  onOpen: () => void;
};

/**
 * 日付詳細 - メモリストのロジック部分
 */
export default function MemoListLogic({ selectedItemTaskId, onOpen }: Props) {
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

  // データ編集関連
  // 対象を保持
  const editTarget = useRef<MemoDailyTask | null>(null);
  const onClickEditButton = useCallback(
    (item: MemoDailyTask) => {
      editTarget.current = item;
      onOpen();
    },
    [onOpen]
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
    /** 編集対象 */
    editTarget,
    /** 編集のボタンを押した際のハンドラー(編集ターゲット指定 + ダイアログの開閉) */
    onClickEditButton,
  };
}
