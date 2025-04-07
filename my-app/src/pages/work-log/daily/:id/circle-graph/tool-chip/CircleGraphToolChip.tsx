import { TaskWithPercentage } from "@/type/Task";
import { Paper, Stack, Typography } from "@mui/material";
import { TooltipProps } from "recharts";

/**
 * 円グラフにホバー時に表示するツールチップのコンポーネント
 */
export default function CircleGraphToolChip({
  active, // 引数はPieからToolChipで受け取る特有のもの
  payload, // active:boolean,payload:Array([0].payloadに対象のデータがある)
}: TooltipProps<number, string>) {
  if (active && payload && payload.length > 0) {
    const dataItem = payload[0].payload; // ← ここで Pie の 1つの data を取得！
    return (
      <Paper sx={{ px: 5, py: 1 }}>
        {dataItem.task.map((item: TaskWithPercentage) => (
          <Stack
            mb={1}
            key={item.id}
            direction="row"
            justifyContent={"space-between"}
          >
            <Typography>{item.name}</Typography>
            <Typography>{item.percent}</Typography>
          </Stack>
        ))}
      </Paper>
    );
  }
  return null;
}
