"use client";
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
import { format } from "date-fns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomMenuTitle from "@/component/menu/content/CustomMenuTitle/CustomMenuTitle";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";

/**
 * 日付ページのテーブルコンポーネント
 */
export default function DailyTable() {
  const {
    itemList,
    isLoading,
    dateToId,
    dateToParam,
    isAsc,
    taskFilterChildProps,
    categoryFilterChildProps,
    isSelected,
    handleClickSortLabel,
    doSort,
    getMemoTitleArrayById,
    doFilterByFilterList,
    handleNavigateSelectedDay,
  } = DailyTableLogic();
  const { handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev } =
    CustomMenuWrapperLogic();
  return (
    <>
      <TableContainer>
        <Table
          sx={{ width: "100%", padding: "16px 24px", tableLayout: "fixed" }}
        >
          <DailyTableHeader
            isAsc={isAsc}
            isSelected={isSelected}
            taskFilterLogic={taskFilterChildProps}
            categoryFilterLogic={categoryFilterChildProps}
            onClickTitle={handleClickSortLabel}
          />
          <TableBody>
            {isLoading && <TableBodyLoading colCount={5} />}
            {!isLoading && itemList.length === 0 && (
              <TableBodyNoItem colCount={5} />
            )}
            {!isLoading &&
              itemList.length > 0 &&
              itemList
                .filter((item) => doFilterByFilterList(item))
                .sort(doSort)
                .map((item) => (
                  <TableRow
                    key={item.date.toISOString()}
                    hover
                    onClick={() =>
                      handleNavigateSelectedDay(dateToParam(item.date))
                    }
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {/** 日付 */}
                    <TableCell
                      sx={{
                        maxWidth: "20%", // 幅
                        width: "20%", // 幅
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
                        maxWidth: "20%", // 幅
                        width: "20%", // 幅
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
                        maxWidth: "20%", // 幅
                        width: "20%", // 幅
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.taskName}
                    </TableCell>
                    {/** メモ(0番目のめもを表示) */}
                    <TableCell
                      sx={{
                        maxWidth: "20%", // 幅
                        width: "20%", // 幅
                        gap: 2,
                        borderRadius: "4px",
                        transition: "background 0.5s",
                        "&:hover": {
                          backgroundColor:
                            item.memo.length > 0
                              ? "rgba(31, 158, 255, 0.37)"
                              : "",
                        },
                      }}
                      onMouseEnter={(e) =>
                        handleMouseEnter(dateToId(item.date), e)
                      }
                      onMouseLeave={() => handleMouseLeave(dateToId(item.date))}
                    >
                      {item.memo.length > 0 && (
                        <>
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
                        </>
                      )}
                    </TableCell>
                    {/** 稼働合計 */}
                    <TableCell
                      sx={{
                        maxWidth: "20%", // 幅
                        width: "20%", // 幅
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
      {/** カスタムメニューの面々   */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
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
