import apiClient from "@/lib/apiClient";
import { localClient } from "@/lib/localClient";
import { SelectChangeEvent } from "@mui/material";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { mutate } from "swr";

type Props = {
  /** 今開いてる対象のデータのid */
  itemId: number;
  /** 稼働時間の初期選択の値 */
  initialHours: number;
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};
/**
 * 完了タスクの編集ダイアログのロジック
 */
export const CompletedTaskEditDialogLogic = ({
  itemId,
  initialHours,
  onClose,
}: Props) => {
  // ぱらめーた
  const { date } = useParams<{ date: string }>();
  // 稼働時間関連
  const [dailyHours, setDailyHours] = useState<number>(initialHours);
  const onChangeSelectHours = useCallback((e: SelectChangeEvent) => {
    const target = e.target.value;
    setDailyHours(Number(target));
  }, []);

  const handleSave = useCallback(async () => {
    // 元の値から稼働時間の変化がある場合のみ送信処理
    if (initialHours !== dailyHours) {
      await localClient.work_log.daily
        ._date(date)
        .task_logs._id(itemId)
        .patch({ body: { workTime: dailyHours } });
      mutate(`api/work-log/daily/${date}`); // 再検証する
    }
    // データに変化がない場合はそのまま閉じるだけ
    onClose();
  }, [dailyHours, date, initialHours, itemId, onClose]);
  const handleDelete = useCallback(async () => {
    await apiClient.work_log.daily._date(date).task_logs._id(itemId).delete();
    mutate(`api/work-log/daily/${date}`); // 再検証する
    onClose();
  }, [date, itemId, onClose]);
  return {
    /** 洗濯中の稼働時間 */
    dailyHours,
    /** 選択した稼働時間に変更するハンドラー */
    onChangeSelectHours,
    /** 編集を保存するハンドラー */
    handleSave,
    /** デリートのイベント */
    handleDelete,
  };
};
