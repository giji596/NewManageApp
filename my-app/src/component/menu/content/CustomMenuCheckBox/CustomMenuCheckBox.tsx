"use client";
import { MenuItem } from "@mui/material";
import { memo } from "react";

type Props = {
  /** 選択肢の配列 */
  checkList: Record<string, boolean>;
  /** 選択した際のイベントハンドラ */
  onClickSelect: (item: string) => void;
};

/**
 * チェックボックスを含むカスタムメニューコンポーネント
 */
const CustomMenuCheckBox = memo(function CustomMenuCheckBox({
  checkList,
  onClickSelect,
}: Props) {
  return Object.entries(checkList).map(([name, bool]) => (
    <MenuItem key={name} onClick={() => onClickSelect(name)}>
      {name}
      <div
        style={{
          width: 12,
          height: 12,
          border: "1px solid rgba(26, 26, 26, 0.14)",
          borderRadius: "50%", // 丸くする
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 8,
          marginRight: 8,
          backgroundColor: "transparent", // 選択された場合の背景色
          transition: "all 0.3s ease", // アニメーションのスムーズさ
          boxShadow: bool ? "0 0 10px rgba(25, 118, 210, 0.6)" : "none", // 選択時にグラデーションっぽく外側に広がる影
        }}
      >
        {bool && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%", // 中も丸く
              backgroundColor: "rgb(28, 164, 255)", // チェック部分の色
            }}
          />
        )}
      </div>
    </MenuItem>
  ));
});
export default CustomMenuCheckBox;
