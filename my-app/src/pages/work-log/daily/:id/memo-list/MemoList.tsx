import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomTableHeader from "./table-header/CustomTableHeader";
import { MemoDailyTask } from "@/type/Memo";
import CustomTableBody from "./table-body/CustomTableBody";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";

type Props = {
  /** メモのアイテム一覧 */
  memoItemList: MemoDailyTask[];
  /** ローディング状態 */
  isLoading: boolean;
};

export default function MemoList({ memoItemList, isLoading }: Props) {
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed " }}>
        <CustomTableHeader
          isAsc={false}
          isSelected={() => false}
          onClickTitle={() => {}}
          onHoverTitle={() => {}}
          onLeaveHoverTitle={() => {}}
        />
        <TableBody>
          {isLoading && <TableBodyLoading colCount={2} />}
          {!isLoading && memoItemList.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{ height: "200px" }}>
                データがありません
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            memoItemList.length !== 0 &&
            memoItemList.map((item) => (
              <CustomTableBody
                key={item.id}
                memoItem={item}
                isActive={false}
                onClickRow={() => {}}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
