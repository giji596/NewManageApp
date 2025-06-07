"use client";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryHeaderLogic from "./CategoryPanelLogic";
import CategoryActionMenuButton from "./component/CategoryActionMenuButton/CategoryActionMenuButton";
import CompleteConfirmDialog from "@/component/dialog/complete-confirm/CompleteConfirmDialog";
import CreateTaskDialog from "@/component/dialog/CreateTaskDialog/CreateTaskDialog";
import ConfirmDeleteDialog from "@/component/dialog/ConfirmDeleteDialog/ConfirmDeleteDialog";
import useDialog from "@/hook/useDialog";
import CategoryDisplayRangeDialog from "./component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialog";
import CreateCategoryDialog from "@/component/dialog/CreateCategoryDialog/CreateCategoryDialog";

/**
 * カテゴリページのヘッダー部分
 */
export default function CategoryHeader() {
  const {
    openError,
    onCloseError,
    growAnimation,
    queryParams,
    handleAdaptDisplayRange,
    categoryOptions,
    isLoadingOptions,
    selectedCategoryId,
    isSelectedIdAvailable,
    isLoadingCategorySummary,
    isCompleted,
    totalHours,
    startDate,
    lastDate,
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
  const {
    open: openCategory,
    onOpen: onOpenCategory,
    onClose: onCloseCategory,
  } = useDialog();
  return (
    <>
      <Stack width="300px" height="40vh" justifyContent="space-between" pl={2}>
        {/** 上部分(カテゴリ選択/完了ボタン) */}
        <Stack direction="row" py={2}>
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
          <IconButton
            sx={{ width: 40, height: 40, alignSelf: "center", ml: 0.5 }}
            onClick={onOpenCategory}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <CategoryActionMenuButton
            isCompleted={isCompleted}
            isNoCategory={isNoCategory}
            onClickDisplayRange={onOpenPeriod}
            onClickComplete={onOpenComplete}
            onClickAddTask={onOpenTask}
            onClickDelete={onOpenDelete}
          />
        </Stack>
        {/** 下部分(カテゴリ情報) */}
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
          <Stack>
            {/** Completed?  */}
            {isCompleted && (
              <Stack direction="row">
                <CheckCircleIcon color="success" />
                <Typography
                  color="success"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  完了済み
                </Typography>
              </Stack>
            )}
            {/** 合計稼働時間 */}
            <Typography color="text.primary" variant="h6">
              総稼働時間: {totalHours}(h)
            </Typography>
            <Stack
              direction="row-reverse"
              sx={(theme) => ({
                width: "70%",
                height: 20,
                background: theme.palette.gradient.achievement,
                borderRadius: 1,
              })}
            >
              <Stack
                sx={{
                  height: "100%",
                  width: "0%",
                  backgroundColor: "gray.normal",
                  animation: `${growAnimation} 1s ease-out forwards`,
                }}
              />
            </Stack>
            {/** 稼働開始 */}
            <Typography pt={1} color="text.primary" variant="h6">
              稼働開始:
              <br /> {startDate}
            </Typography>
            <Typography pt={1} color="text.primary" variant="h6">
              最終稼働: <br /> {lastDate}
            </Typography>
          </Stack>
        )}
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
          target="カテゴリ"
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
      {openCategory && (
        <CreateCategoryDialog open={openCategory} onClose={onCloseCategory} />
      )}
      {/** スナックバー(エラーメッセージ) */}
      {openError && (
        <Snackbar open={openError} onClose={onCloseError}>
          <Alert severity="error">
            参照されているカテゴリは削除できません。
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
