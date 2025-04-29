import {
  Button,
  Menu,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { memo } from "react";
import { DateSelectMenuButtonLogic } from "./DateSelectMenuButtonLogic";

type Props = {
  /** 名称(識別/アクセシビリティ用) */
  name: string;
  /** 選択中の年 */
  selectYear: number;
  /** 選択中の月 */
  selectMonth: number;
  /** 選択中の日 */
  selectDay: number;
};
/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネント
 */
const DateSelectMenuButton = memo(function DateSelectMenuButton({
  name,
  selectYear,
  selectMonth,
  selectDay,
}: Props) {
  const { selectList, getSelectValue } = DateSelectMenuButtonLogic({
    selectYear,
    selectMonth,
    selectDay,
  });

  return (
    <>
      <Button aria-label={name}>yyyy/mm/dd</Button>
      <Menu id={`${name}-menu`} open={false /** TODO:あとで修正 */}>
        <Stack direction="row" px={1.5} py={0.5}>
          {selectList.map((v) => (
            <FormControl key={v}>
              <Select
                name={`${name}-${v}-select`}
                aria-label={`${name}-${v}-select`}
                variant="standard"
                value={getSelectValue(v)}
              >
                <MenuItem value={v}>{v}</MenuItem>
              </Select>
            </FormControl>
          ))}
        </Stack>
      </Menu>
    </>
  );
});
export default DateSelectMenuButton;
