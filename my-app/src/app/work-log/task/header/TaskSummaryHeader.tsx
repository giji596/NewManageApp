"use client";
import { Button, Stack } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TuneIcon from "@mui/icons-material/Tune";
import { memo } from "react";

type Props = {
  /** 変更の有無 */
  isDirty: boolean;
  /** 選択中のデータの有無 */
  isSelected: boolean;
  /** 表示範囲変えるボタン押した時のハンドラー */
  onClickChangeDisplayRange: () => void;
  /** 変更を保存するハンドラー */
  onClickSave: () => void;
  /** 変更を破棄するハンドラー */
  onClickReset: () => void;
  /** 詳細ページへ移動するハンドラー */
  onClickNavigateDetail: () => void;
};

/**
 * タスク一覧ページのヘッダー
 */
const TaskSummaryHeader = memo(function TaskSummaryHeader({
  isDirty,
  isSelected,
  onClickChangeDisplayRange,
  onClickSave,
  onClickReset,
  onClickNavigateDetail,
}: Props) {
  return (
    <Stack
      direction="row"
      p={2}
      alignItems={"flex-end"}
      justifyContent={"space-between"}
    >
      {/** 左側(ナビゲーション) */}
      <Stack spacing={2}>
        <Button
          sx={{ width: 200 }}
          startIcon={<TuneIcon />}
          variant="contained"
          onClick={onClickChangeDisplayRange}
        >
          表示範囲を変更する
        </Button>
        <Button
          disabled={!isSelected}
          startIcon={<NavigateNextIcon />}
          onClick={onClickNavigateDetail}
        >
          選択中のデータの詳細ページへ移動
        </Button>
      </Stack>
      {/** 右側(変更の保存/破棄) */}
      <Stack spacing={1}>
        <Button
          disabled={!isDirty}
          startIcon={<DoneAllIcon />}
          onClick={onClickSave}
        >
          変更を保存する
        </Button>
        <Button
          disabled={!isDirty}
          color={"error"}
          startIcon={<RestartAltIcon />}
          onClick={onClickReset}
        >
          変更を破棄する
        </Button>
      </Stack>
    </Stack>
  );
});
export default TaskSummaryHeader;
