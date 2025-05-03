"use client";
import { PieChart, Pie, Tooltip } from "recharts";
import { DailyCategoryCircleGraph } from "@/type/Date";
import CustomToolTipWrapper from "@/component/graph/tool-chip/CustomToolTipWrapper";
import CustomToolTipContent from "@/component/graph/tool-chip/CustomToolTipContent";
import CircleGraphLogic from "./CircleGraphLogic";

type Props = {
  /** データ */
  data: DailyCategoryCircleGraph[];
};

/**
 * 日付詳細 - 円グラフコンポーネント
 */
export default function CircleGraph({ data }: Props) {
  const { isNoData, displayData, color, getLabel } = CircleGraphLogic({ data });
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={displayData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill={color}
        label={getLabel}
      />
      <Tooltip
        content={
          <CustomToolTipWrapper>
            {(dataItem: DailyCategoryCircleGraph) =>
              dataItem.task.map((item) => (
                <CustomToolTipContent
                  key={item.id}
                  name={item.name}
                  value={item.percent}
                />
              ))
            }
          </CustomToolTipWrapper>
        }
      />
    </PieChart>
  );
}
