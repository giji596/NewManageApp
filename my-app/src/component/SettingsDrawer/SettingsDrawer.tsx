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

/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタン
 */
const SettingsDrawer = memo(function SettingsDrawer() {
  return (
    <>
      {/** 開閉用のボタン */}
      <IconButton>
        <MenuIcon />
      </IconButton>
      {/** サイドバー */}
      <Drawer open={true /** TODO:あとで修正 */}>
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
              <ListItemButton>
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
    </>
  );
});
export default SettingsDrawer;
