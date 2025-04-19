import { Box, Breadcrumbs, ButtonBase, Link, Typography } from "@mui/material";
import { NavBarLogic } from "./logic";

/**
 *  ナビゲーションバーの共通コンポーネント
 */
export default function Navbar() {
  const { navPages, isLastPageIndex, getLink } = NavBarLogic();

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        color: "white",
        padding: 5,
      }}
    >
      {/* 左の四角形エリア */}
      <Box
        sx={{
          flex: "0 0 60%", // 全体の70%を占める
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          background:
            "linear-gradient(to right, rgb(255, 255, 255), rgb(220, 220, 220))",
          borderBottom: "1px solid #ccc",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/** ナビゲーション部分 */}
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {navPages.map((navPage, index) => {
            {
              /** 最後の場合(現在開いているページ)ではリンクの代わりにTypographyを表示 */
            }
            if (isLastPageIndex(index)) {
              return (
                <Typography key={navPage} sx={{ color: "text.primary" }}>
                  {navPage}
                </Typography>
              );
            } else {
              {
                /** ページのリンクを表示する */
              }
              return (
                <ButtonBase
                  key={navPage}
                  component={Link}
                  href={getLink(navPages, index)}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    overflow: "hidden", // リップルがはみ出さないように
                    transition: "background-color 0.2s, transform 0.1s",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                      transform: "scale(0.98)", // 押し込む感じ
                    },
                  }}
                >
                  <Link
                    key={navPage}
                    underline="hover"
                    color="inherit"
                    href={getLink(navPages, index)}
                  >
                    {navPage}
                  </Link>
                </ButtonBase>
              );
            }
          })}
        </Breadcrumbs>
      </Box>
      {/* 右の三角形エリア */}
      <Box
        sx={{
          flex: "0 0 40%", // 残り30%
          background:
            "linear-gradient(to right, rgb(220, 220, 220), rgb(117, 117, 117))",
          clipPath: "polygon(0 0, 100% 0, 0 100%)", // 右側が尖る三角形
          borderBottom: "1px solid #ccc",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Box>
  );
}
