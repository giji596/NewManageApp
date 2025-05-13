import { useMemo } from "react";

type Props = {
  /** 開始日(yyyy/MM/dd) */
  firstActivityDate: string | null;
  /** 最終実施日(実施記録がない場合はnull) */
  lastActivityDate: string | null;
};

/**
 * タスク詳細　日付の表示部分のロジック
 */
export const DateDisplayLogic = ({
  firstActivityDate,
  lastActivityDate,
}: Props) => {
  const firstDateText = useMemo(
    () => (firstActivityDate ? firstActivityDate : "-"),
    [firstActivityDate]
  );

  const lastDateText = useMemo(
    () => (lastActivityDate ? lastActivityDate : "-"),
    [lastActivityDate]
  );

  return {
    /** 開始日のテキスト(null時に-を表示) */
    firstDateText,
    /** 最終実施日のテキスト(null時に-を表示) */
    lastDateText,
  };
};
