import SelectLikeDisplay from "@/component/SelectLikeDisplay/SelectLikeDisplay";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { memo } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SliderLikeDisplay from "@/component/SliderLikeDisplay/SliderLikeDisplay";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/**
 * 完了タスクの編集ダイアログ
 */
const CompletedTaskEditDialog = memo(function CompletedTaskEditDialog() {
  return (
    <Dialog open={true /**TODO:後で */} maxWidth="sm" fullWidth>
      <DialogContent sx={{ pb: 3 }}>
        <Stack spacing={3} mt={1}>
          {/** カテゴリ */}
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={1.5}
          >
            <SelectLikeDisplay
              text={"カテゴリ" /**TODO:指定する */}
              width={400}
            />
            <AddCircleOutlineIcon />
          </Stack>
          {/** タスク */}
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={1.5}
          >
            <SelectLikeDisplay
              text={"タスク" /**TODO:指定する */}
              width={400}
            />
            <AddCircleOutlineIcon />
          </Stack>
          {/** 稼働時間/進捗/メモ追加ボタン */}
          <Stack direction="row" justifyContent={"space-between"} pr={4}>
            {/** 稼働時間 */}
            <FormControl sx={{ width: "20%" }}>
              <InputLabel
                id="hours-select-label"
                sx={{
                  left: 0, // ← 左寄せ
                  transform: "translate(0, -50%) scale(0.75)", // ← 初期位置に強制
                  whiteSpace: "nowrap", // 改行させない
                  overflow: "visible", // はみ出ても切らない
                }}
              >
                稼働時間(hour)
              </InputLabel>
              <Select
                labelId="hours-select-label"
                id="hours-select"
                name="hours-select"
                value={"0.25" /**TODO:あとで */}
                label="稼働時間(hour)"
                variant="standard"
              >
                {[...Array(41)].map((_, i) => (
                  <MenuItem key={i} value={i * 0.25}>
                    {i * 0.25}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/** 進捗 */}
            <SliderLikeDisplay title={"進捗"} width={250} value={100} />
            {/** メモ追加ボタン */}
            <Button startIcon={<AddCommentIcon />}>メモを追加</Button>
          </Stack>
        </Stack>
      </DialogContent>
      {/** ボタン群 */}
      <Stack direction="row" justifyContent={"space-between"} py={2} px={4}>
        <Stack>
          <Button startIcon={<DeleteIcon />} color="error">
            削除
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button>キャンセル</Button>
          <Button startIcon={<CheckCircleIcon />} variant="contained">
            保存
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
});
export default CompletedTaskEditDialog;
