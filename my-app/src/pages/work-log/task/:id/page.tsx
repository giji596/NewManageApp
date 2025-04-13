import { Stack } from "@mui/material";
import MainDisplay from "./main-display/MainDisplay";
import MemoList from "./memo-list/MemoList";
import DateDisplay from "./date-display/DateDisplay";
import ActionButtons from "./action-buttons/ActionButtons";

/**
 * タスク詳細ページ
 */
export default function TaskDetailPage() {
  return (
    <Stack direction="row">
      {/**　左部分(メインディスプレイ/テーブル) */}
      <Stack width="70%">
        {/** メインディスプレイ */}
        <Stack height={200} pt={2}>
          <MainDisplay
            taskName={""}
            isFavorite={false}
            categoryName={""}
            progress={0}
            totalHours={0}
            onClickNavigateCategoryPage={() => {}}
          />
        </Stack>
        {/** テーブル */}
        <Stack height={400} overflow="auto">
          <MemoList memoItemList={[]} />
        </Stack>
      </Stack>
      {/** 右部分(日付/アクションボタン) */}
      <Stack width="30%" justifyContent={"space-between"}>
        {/** 日付 */}
        <Stack pt={3}>
          <DateDisplay startDate={"2222/22/22"} lastDate={"4444/44/44"} />
        </Stack>
        {/** アクションボタン */}
        <Stack>
          <ActionButtons
            onClickEdit={() => {}}
            onClickComplete={() => {}}
            onClickDelete={() => {}}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
