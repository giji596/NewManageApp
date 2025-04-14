import { CircularProgress, Stack } from "@mui/material";
import MainDisplay from "./main-display/MainDisplay";
import MemoList from "./memo-list/MemoList";
import DateDisplay from "./date-display/DateDisplay";
import ActionButtons from "./action-buttons/ActionButtons";
import useTaskDetailPage from "./useTaskDetailPage";
import TaskEditDialog from "./dialog/task-edit/TaskEditDialog";
import useDialog from "@/hook/useDialog";

/**
 * タスク詳細ページ
 */
export default function TaskDetailPage() {
  const {
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
  } = useTaskDetailPage();
  const {
    open: openEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
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
                onClickNavigateCategoryPage={() => {}}
              />
            </Stack>
            {/** テーブル */}
            <Stack height={400} overflow="auto">
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
                onClickEdit={onOpenEdit}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
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
    </>
  );
}
