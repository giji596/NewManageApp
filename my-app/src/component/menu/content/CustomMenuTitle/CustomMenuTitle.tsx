import { Divider, Typography } from "@mui/material";
import React from "react";

type Props = {
  /** タイトル名の配列 */
  titleList: string[];
};
/**
 * タイトルの表示のみをするカスタムメニューコンポーネントのコンテンツコンポーネント
 */
export default function CustomMenuTitle({ titleList }: Props) {
  return titleList.map((title, index) => (
    <React.Fragment key={title}>
      <Typography padding={1}>{title}</Typography>
      {index < titleList.length - 1 && <Divider />}
    </React.Fragment>
  ));
}
