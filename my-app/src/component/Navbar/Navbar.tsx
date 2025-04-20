"use client";
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
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
        padding: 1,
      }}
    >
      {/* 左の四角形エリア */}
      <Box
        sx={{
          flex: "0 0 60%", // 全体の70%を占める
          display: "flex",
          justifyContent: "flex-start",
          padding: 1,
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
                <Button
                  key={navPage}
                  component={Link}
                  href={getLink(index)}
                  sx={{
                    height: 30,
                    fontSize: "1rem", // Typographyに合わせたフォントサイズ（必要なら）
                    fontWeight: "normal", // Typographyに寄せたいならlightやnormalで調整
                    color: "inherit", // 親と同じ色
                    borderRadius: "50%",
                    transition: "background-color 0.2s, transform 0.1s",
                    "&:hover": {
                      textDecoration: "underline", // ホバー時のアンダーライン
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)",
                      transform: "scale(0.98)", // 押し込む感じ
                    },
                  }}
                >
                  {navPage}
                </Button>
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
