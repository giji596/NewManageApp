import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import MemoListHeader from "./header/MemoListHeader";
import { MemoTaskDetail } from "@/type/Memo";
import MemoListRow from "./row/MemoListRow";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <MemoListHeader
            isAsc={false}
            tagCheckList={{}}
            isSelected={() => false}
            onClickTitle={() => {}}
            onClickSelectTag={() => {}}
          />
        </TableHead>
        <TableBody>
          {memoItemList.map((item) => (
            <MemoListRow
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
