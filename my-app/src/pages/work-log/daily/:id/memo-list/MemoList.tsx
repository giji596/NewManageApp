import { Table, TableBody, TableContainer } from "@mui/material";
import CustomTableHeader from "./table-header/CustomTableHeader";
import { MemoDailyTask } from "@/type/Memo";
import CustomTableBody from "./table-body/CustomTableBody";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";

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
            <TableBodyNoItem colCount={2} />
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
