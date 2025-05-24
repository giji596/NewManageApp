import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { memo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContrastIcon from "@mui/icons-material/Contrast";
import DataResetDialog from "./dialog/DataResetDialog/DataResetDialog";
import useDialog from "@/hook/useDialog";
import { SettingsDrawerLogic } from "./SettingsDrawerLogic";

type Props = {
  /** テーマ変更関数 */
  onChangeTheme: () => void;
};
/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタン
 */
const SettingsDrawer = memo(function SettingsDrawer({ onChangeTheme }: Props) {
  const {
    open: openReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDialog();
  const {
    open,
    onOpen,
    onClose,
    fileInputRef,
    onClickImport,
    handleFileChange,
    onClickExport,
    onClickTheme,
  } = SettingsDrawerLogic({ onChangeTheme });
  return (
    <>
      {/** 開閉用のボタン */}
      <IconButton sx={{ py: 0.3 }} onClick={onOpen}>
        <MenuIcon />
      </IconButton>
      {/** サイドバー */}
      <Drawer open={open} onClose={onClose}>
        {/**　コンテンツ */}
        <List>
          {/** データ管理(タイトル) */}
          <ListItem>
            <ListItemText primary="▼　データ管理" />
          </ListItem>
          {/** データ管理(各項目) */}
          <List sx={{ pl: 1, py: 0 }}>
            {/** インポート */}
            <ListItem disablePadding>
              <ListItemButton onClick={onClickImport}>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary={"インポート"} />
              </ListItemButton>
              {/** インポート用のinput(ファイル選択に必須) */}
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // 非表示
              />
            </ListItem>
            {/** エクスポート */}
            <ListItem disablePadding>
              <ListItemButton onClick={onClickExport}>
                <ListItemIcon>
                  <FileDownloadIcon />
                </ListItemIcon>
                <ListItemText primary={"エクスポート"} />
              </ListItemButton>
            </ListItem>
            {/** データリセット */}
            <ListItem disablePadding>
              <ListItemButton onClick={onOpenReset}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary={"データリセット"} />
              </ListItemButton>
            </ListItem>
          </List>
          {/** 分割線 */}
          <Divider sx={{ width: "90%", justifySelf: "center", my: 2 }} />
          {/** 表示設定(タイトル) */}
          <ListItem>
            <ListItemText primary="▼　表示設定" />
          </ListItem>
          {/** 表示設定(各項目) */}
          <List sx={{ pl: 1, py: 0 }}>
            {/** テーマ */}
            <ListItem disablePadding>
              <ListItemButton onClick={onClickTheme}>
                <ListItemIcon>
                  <ContrastIcon />
                </ListItemIcon>
                <ListItemText primary={"テーマ切り替え"} />
              </ListItemButton>
            </ListItem>
          </List>
        </List>
      </Drawer>
      {openReset && <DataResetDialog open={openReset} onClose={onCloseReset} />}
    </>
  );
});
export default SettingsDrawer;
