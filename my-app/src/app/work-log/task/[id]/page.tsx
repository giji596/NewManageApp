"use client";
import {
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import MainDisplay from "./main-display/MainDisplay";
import MemoList from "./memo-list/MemoList";
import DateDisplay from "./date-display/DateDisplay";
import ActionButtons from "./action-buttons/ActionButtons";
import useTaskDetailPage from "./useTaskDetailPage";
import TaskEditDialog from "../../../../component/dialog/task-edit/TaskEditDialog";
import useDialog from "@/hook/useDialog";
import CompleteConfirmDialog from "../../../../component/dialog/complete-confirm/CompleteConfirmDialog";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { use } from "react";

type Props = {
  /** パスパラメータ(ページ呼び出し時に自動的に取得) */
  params: Promise<{ id: string }>;
};
/**
 * タスク詳細ページ
 */
export default function TaskDetailPage({ params }: Props) {
  const { id } = use(params);
  const {
    openError,
    onCloseError,
    isLoading,
    taskName,
    categoryId,
    categoryName,
    isFavorite,
    progress,
    totalHours,
    startDateString,
    lastDateString,
    memoList,
    isCompleted,
    handleComplete,
    handleDelete,
    navigateCategoryPage,
  } = useTaskDetailPage({ id });
  const {
    open: openEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDialog();
  const {
    open: openComplete,
    onClose: onCloseComplete,
    onOpen: onOpenComplete,
  } = useDialog();
  const {
    open: openDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
  return (
    <>
      {isLoading && (
        <Stack
          width={1187}
          height={616}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && (
        <Stack direction="row">
          {/** TODO:isLoadingで分岐させて表示を変えさせる */}
          {/**　左部分(メインディスプレイ/テーブル) */}
          <Stack width="70%">
            {/** メインディスプレイ */}
            <Stack height={200} pt={2}>
              <MainDisplay
                taskName={taskName}
                isFavorite={isFavorite}
                categoryName={categoryName}
                progress={progress}
                totalHours={totalHours}
                onClickNavigateCategoryPage={navigateCategoryPage}
              />
            </Stack>
            {/** テーブル */}
            <Stack height={400} overflow="auto">
              <Typography variant="subtitle1" paddingLeft={3}>
                メモ一覧
              </Typography>
              <MemoList memoItemList={memoList} />
            </Stack>
          </Stack>
          {/** 右部分(日付/アクションボタン) */}
          <Stack width="30%" justifyContent={"space-between"}>
            {/** 日付 */}
            <Stack pt={3}>
              <DateDisplay
                startDate={startDateString}
                lastDate={lastDateString}
              />
            </Stack>
            {/** アクションボタン */}
            <Stack>
              <ActionButtons
                isCompleted={isCompleted}
                onClickEdit={onOpenEdit}
                onClickComplete={onOpenComplete}
                onClickDelete={onOpenDelete}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
      {openEdit && (
        <TaskEditDialog
          open={openEdit}
          onClose={onCloseEdit}
          initialTaskName={taskName}
          initialCategoryId={categoryId}
          initialIsFavorite={isFavorite}
        />
      )}
      {openComplete && (
        <CompleteConfirmDialog
          open={openComplete}
          onClose={onCloseComplete}
          onAccept={handleComplete}
        />
      )}
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          onAccept={handleDelete} // TODO:動作を設定
        />
      )}
      {openError && (
        <Snackbar open={openError} onClose={onCloseError}>
          <Alert severity="error">参照されているタスクは削除できません。</Alert>
        </Snackbar>
      )}
    </>
  );
}
