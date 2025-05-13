import { useMemo } from "react";

type Props = {
  /** 最終実施日(実施記録がない場合はnull) */
  lastActivityDate: string | null;
};

/**
 * タスク詳細　日付の表示部分のロジック
 */
export const DateDisplayLogic = ({ lastActivityDate }: Props) => {
  const lastDateText = useMemo(
    () => (lastActivityDate ? lastActivityDate : "-"),
    [lastActivityDate]
  );

  return {
    /** 最終実施日のテキスト(null時に--/--/--を表示) */
    lastDateText,
  };
};
