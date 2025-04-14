import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PeriodSelectMenuButtonLogic from "./PeriodSelectMenuButtonLogic";

/**
 * 期間選択のメニューボタン
 */
export default function PeriodSelectMenuButton() {
  const { open, anchorEl, handleOpen, handleClose } =
    PeriodSelectMenuButtonLogic();
  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          textTransform: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          borderRadius: 0,
          pr: 0,
          pl: 1,
          minWidth: 120,
          color: "text.primary",
          fontSize: "1rem",
          justifyContent: "space-between",
          "&:hover": {
            backgroundColor: "transparent",
            borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
          },
          "&:focus": {
            outline: "none",
            borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
          },
        }}
        disableRipple
      >
        2025/04/22
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Stack direction={"row"} spacing={1} px={2} py={0.5}>
          <FormControl>
            <InputLabel>年</InputLabel>
            <Select label="年" value={"2025年"} sx={{ width: 125 }}>
              <MenuItem value={"2025年"}>2025年</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>月</InputLabel>
            <Select label="月" value={"4月"} sx={{ width: 100 }}>
              <MenuItem value={"4月"}>4月</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>日</InputLabel>
            <Select label="日" value={"22日"} sx={{ width: 100 }}>
              <MenuItem value={"22日"}>22日</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Menu>
    </>
  );
}
