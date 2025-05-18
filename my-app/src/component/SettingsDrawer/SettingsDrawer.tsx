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

/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタン
 */
const SettingsDrawer = memo(function SettingsDrawer() {
  const {
    open: openReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDialog();
  const { open, onOpen, onClose } = SettingsDrawerLogic();
  return (
    <>
      {/** 開閉用のボタン */}
      <IconButton onClick={onOpen}>
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
              <ListItemButton>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary={"インポート"} />
              </ListItemButton>
            </ListItem>
            {/** エクスポート */}
            <ListItem disablePadding>
              <ListItemButton>
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
            <ListItem disablePadding>
              <ListItemButton>
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
