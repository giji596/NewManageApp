"use client";
import { PieChart, Pie, Tooltip } from "recharts";
import { DailyCategoryCircleGraph } from "@/type/Date";
import CustomToolTipWrapper from "@/component/graph/tool-chip/CustomToolTipWrapper";
import CustomToolTipContent from "@/component/graph/tool-chip/CustomToolTipContent";
import CircleGraphLogic from "./CircleGraphLogic";
import NoDataPieGraph from "@/component/graph/NoDataPie";

type Props = {
  /** データ */
  data: DailyCategoryCircleGraph[];
};

/**
 * 日付詳細 - 円グラフコンポーネント
 */
export default function CircleGraph({ data }: Props) {
  const { isNoData, getLabel } = CircleGraphLogic({ data });
  return (
    <>
      {!isNoData && (
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill={"#8884d8"}
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
      )}
      {isNoData && <NoDataPieGraph width={500} height={300} radius={90} />}
    </>
  );
}
