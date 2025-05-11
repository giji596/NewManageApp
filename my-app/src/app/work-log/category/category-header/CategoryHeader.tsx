"use client";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryHeaderLogic from "./CategoryHeaderLogic";
import CategoryActionMenuButton from "./component/CategoryActionMenuButton/CategoryActionMenuButton";
import CompleteConfirmDialog from "@/component/dialog/complete-confirm/CompleteConfirmDialog";
import CreateTaskDialog from "@/component/dialog/CreateTaskDialog/CreateTaskDialog";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import CategoryDisplayRangeDialog from "./component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialog";

/**
 * カテゴリページのヘッダー部分
 */
export default function CategoryHeader() {
  const {
    growAnimation,
    queryParams,
    handleAdaptDisplayRange,
    categoryOptions,
    isLoadingOptions,
    selectedCategoryId,
    isSelectedIdAvailable,
    selectedCategoryName,
    isLoadingCategorySummary,
    isCompleted,
    totalHours,
    activeDate,
    onChangeCategoryId,
    handleComplete,
    handleDelete,
    isNoCategory,
  } = CategoryHeaderLogic();

  const {
    open: openPeriod,
    onOpen: onOpenPeriod,
    onClose: onClosePeriod,
  } = useDialog();
  const {
    open: openComplete,
    onOpen: onOpenComplete,
    onClose: onCloseComplete,
  } = useDialog();
  const {
    open: openTask,
    onOpen: onOpenTask,
    onClose: onCloseTask,
  } = useDialog();
  const {
    open: openDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDialog();
  return (
    <>
      <Stack direction="row" px={4} py={2} justifyContent={"space-between"}>
        {/** 左部分(カテゴリ情報) */}
        {isLoadingCategorySummary && (
          <Stack
            width="550px"
            height="100px"
            alignItems="center"
            justifySelf={"center"}
          >
            <CircularProgress />
          </Stack>
        )}
        {/** データなしの場合 空白のStackを配置 */}
        {!isLoadingCategorySummary && isNoCategory && (
          <Stack
            width="550px"
            height="100px"
            alignItems="center"
            justifySelf={"center"}
          />
        )}
        {!isLoadingCategorySummary && !isNoCategory && (
          <Stack spacing={0.5} width="550px">
            {/** カテゴリ名 + Completed? */}
            <Stack direction="row" spacing={1}>
              <Typography width="120px" textAlign={"end"} variant="h6">
                カテゴリ名:
              </Typography>
              <Typography variant="h6">{selectedCategoryName}</Typography>
              {isCompleted && (
                <>
                  <CheckCircleIcon color="success" />
                  <Typography
                    color="success"
                    variant="subtitle1"
                    fontWeight={700}
                  >
                    完了済み
                  </Typography>
                </>
              )}
            </Stack>
            {/** 合計稼働時間 */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography width="120px" textAlign={"end"} variant="h6">
                総稼働時間:
              </Typography>
              <Typography variant="h6">{totalHours}(h)</Typography>
              <Stack
                direction="row-reverse"
                sx={{
                  width: "70%",
                  height: 20,
                  background:
                    "linear-gradient(to right,rgb(188, 255, 249),rgb(71, 255, 74))",
                  borderRadius: 1,
                }}
              >
                <Stack
                  sx={{
                    height: "100%",
                    width: "0%",
                    backgroundColor: "#eee",
                    animation: `${growAnimation} 1s ease-out forwards`,
                  }}
                />
              </Stack>
            </Stack>
            {/**  */}
            <Stack direction="row" spacing={1}>
              <Typography width="120px" textAlign={"end"} variant="h6">
                稼働期間:
              </Typography>
              <Typography variant="h6">{activeDate}</Typography>
            </Stack>
          </Stack>
        )}
        {/** 右部分(カテゴリ選択/完了ボタン) */}
        <Stack spacing={1} direction="row">
          {(isLoadingOptions || !isSelectedIdAvailable) && (
            <Stack
              width={113}
              height={104}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularProgress size={30} />
            </Stack>
          )}
          {!isLoadingOptions && isSelectedIdAvailable && (
            <FormControl>
              <FormLabel>カテゴリを選択</FormLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                name="category-select"
                variant="standard"
                value={String(selectedCategoryId)}
                onChange={onChangeCategoryId}
                disabled={isNoCategory} // カテゴリ選択賜がない場合はdisabled
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <CategoryActionMenuButton
            isCompleted={false}
            onClickDisplayRange={onOpenPeriod}
            onClickComplete={onOpenComplete}
            onClickAddTask={onOpenTask}
            onClickDelete={onOpenDelete}
          />
        </Stack>
      </Stack>
      {/** ダイアログ群 */}
      {openPeriod && (
        <CategoryDisplayRangeDialog
          open={openPeriod}
          onClose={onClosePeriod}
          initDisplayRange={queryParams.displayRange}
          initStartDate={queryParams.startDate}
          initEndDate={queryParams.endDate}
          initHideCompleted={queryParams.hideCompleted}
          onAdapt={handleAdaptDisplayRange}
        />
      )}
      {openComplete && (
        <CompleteConfirmDialog
          open={openComplete}
          onClose={onCloseComplete}
          onAccept={handleComplete}
        />
      )}
      {openTask && (
        <CreateTaskDialog
          open={openTask}
          onClose={onCloseTask}
          categoryId={selectedCategoryId}
        />
      )}
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={onCloseDelete}
          onAccept={handleDelete}
        />
      )}
    </>
  );
}
