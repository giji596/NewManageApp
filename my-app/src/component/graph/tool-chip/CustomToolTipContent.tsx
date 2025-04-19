import { Stack, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
  /** プロパティ名 */
  name: string;
  /** プロパティ値 */
  value: string;
};
/**
 * rechartsのツールチップのカスタムコンテンツ (name : value　の形式で表示)
 */
const CustomToolTipContent = memo(function CustomToolTipContent({
  name,
  value,
}: Props) {
  return (
    <Stack m={0.5} direction="row" justifyContent={"space-between"}>
      <Typography>{name}</Typography>
      <Typography>：</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
});
export default CustomToolTipContent;
