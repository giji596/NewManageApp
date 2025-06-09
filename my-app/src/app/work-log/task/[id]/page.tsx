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
import TaskEditDialog from "./dialog/task-edit/TaskEditDialog";
import useDialog from "@/hook/useDialog";
import CompleteConfirmDialog from "../../../../component/dialog/complete-confirm/CompleteConfirmDialog";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { Suspense } from "react";

/**
 * タスク詳細ページ
 */
export default function TaskDetailPage() {
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
    firstActivityDateString,
    lastActivityDateString,
    memoList,
    isCompleted,
    handleComplete,
    handleDelete,
    navigateCategoryPage,
  } = useTaskDetailPage();
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
    <Suspense>
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
                firstActivityDate={firstActivityDateString}
                lastActivityDate={lastActivityDateString}
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
          target="タスク"
          open={openComplete}
          onClose={onCloseComplete}
          onAccept={handleComplete}
        />
      )}
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          onAccept={handleDelete}
        />
      )}
      {openError && (
        <Snackbar open={openError} onClose={onCloseError}>
          <Alert severity="error">参照されているタスクは削除できません。</Alert>
        </Snackbar>
      )}
    </Suspense>
  );
}
