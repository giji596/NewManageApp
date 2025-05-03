import { keyframes } from "@emotion/react";
import { useMemo } from "react";

type Props = {
  /** 進捗 */
  progress: number;
};

/**
 * タスク詳細ページのメイン部分の表示のロジック
 */
export default function MainDisplayLogic({ progress }: Props) {
  const growAnimation = useMemo(() => {
    const dailyHourCoverGraphLength = 100 - progress;
    return keyframes`
   0% {
     width: 100%;
   }
   100% {
     width: ${dailyHourCoverGraphLength}%;
   }
 `;
  }, [progress]);

  return {
    /** 進行度のバーの灰色部分の長さ */
    growAnimation,
  };
}
