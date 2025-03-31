import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DailyTableLogic from "./logic";
import DailyTableHeader from "./header/DailyTableHeader";
import { DateSummary } from "@/type/Date";
import { format } from "date-fns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomMenuTitle from "@/component/menu/content/CustomMenuTitle/CustomMenuTitle";

type Props = {
  /** アイテム */
  itemList: DateSummary[];
};
/**
 * 日付ページのテーブルコンポーネント
 */
export default function DailyTable({ itemList }: Props) {
  const {
    isAsc,
    taskFilterList,
    categoryFilterList,
    isSelected,
    handleSetSortTarget,
    doSortByTitle,
    getMemoTitleArrayById,
    toggleCategoryFilterCheckBox,
    toggleTaskFilterCheckBox,
    doFilterByFilterList,
  } = DailyTableLogic({ itemList });
  const { handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev } =
    CustomMenuWrapperLogic();
  return (
    <>
      <TableContainer>
        <Table sx={{ width: "100%", padding: "16px 24px" }}>
          <DailyTableHeader
            isAsc={isAsc}
            isSelected={isSelected}
            OnClickTitle={handleSetSortTarget}
            onHoverTitle={handleMouseEnter}
            onLeaveHoverTitle={handleMouseLeave}
          />
          <TableBody>
            {itemList
              .filter((item) => doFilterByFilterList(item))
              .sort((a, b) => doSortByTitle(a, b))
              .map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  onClick={() => {}}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {/** 日付 */}
                  <TableCell
                    sx={{
                      maxWidth: "150px", // 幅
                      width: "150px", // 幅
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>{format(item.date, "yyyy-MM-dd")}</Typography>
                  </TableCell>
                  {/** メインカテゴリ */}
                  <TableCell
                    sx={{
                      maxWidth: "150px", // 幅
                      width: "150px", // 幅
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.categoryName}
                  </TableCell>
                  {/** メインタスク */}
                  <TableCell
                    sx={{
                      maxWidth: "150px", // 幅
                      width: "150px", // 幅
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.taskName}
                  </TableCell>
                  {/** メモ(0番目のめもを表示)  TODO:展開できるようにする*/}
                  <TableCell
                    sx={{
                      maxWidth: "150px", // 幅
                      width: "150px", // 幅
                      gap: 2,
                      borderRadius: "4px",
                      transition: "background 0.5s",
                      "&:hover": {
                        backgroundColor: "rgba(31, 158, 255, 0.37)",
                      },
                    }}
                    onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                  >
                    <Typography
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.memo[0].title}
                    </Typography>
                    <KeyboardArrowDownIcon
                      sx={{
                        opacity: 0.6,
                        fontSize: 20,
                      }}
                    />
                  </TableCell>
                  {/** 稼働合計 */}
                  <TableCell
                    sx={{
                      maxWidth: "150px", // 幅
                      width: "150px", // 幅
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography>{item.dailyHours}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** カスタムメニューの面々   TODO: 条件分岐させる(メモのやつかどっちか) */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
        {/** カテゴリメニューの場合 */}
        {openTargetIdRef.current === 10000 && (
          <CustomMenuCheckBox
            checkList={categoryFilterList}
            onClickSelect={toggleCategoryFilterCheckBox}
          />
        )}
        {/** タスクメニューの場合 */}
        {openTargetIdRef.current === 10001 && (
          <CustomMenuCheckBox
            checkList={taskFilterList}
            onClickSelect={toggleTaskFilterCheckBox}
          />
        )}
        {/** メモの場合 */}
        {![10000, 10001].includes(openTargetIdRef.current) && (
          <CustomMenuTitle
            titleList={getMemoTitleArrayById(openTargetIdRef.current)}
          />
        )}
      </CustomMenuWrapper>
    </>
  );
}
