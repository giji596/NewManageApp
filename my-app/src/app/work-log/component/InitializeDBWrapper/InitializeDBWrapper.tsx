"use client";

import { isDBExists, initializeDB } from "@/lib/dexie";
import { ReactNode, useEffect } from "react";

/**
 * DB初期化処理用のラッパー
 */
export const InitializeDBWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    (async () => {
      // データベースの存在チェック
      const isExist = await isDBExists();
      if (!isExist) {
        // なければ初期化
        initializeDB();
      }
    })();
  }, []);
  return <>{children}</>;
};
