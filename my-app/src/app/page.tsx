"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ホームページ
 * - 現状はwork-logページのみのためリダイレクトのみ
 * - 今後実装次第で利用するかもしれないのでホームページとしてとっておく
 */
export default function Home() {
  // ワークログページへ即座に遷移
  const router = useRouter();
  useEffect(() => {
    router.push("/work-log");
  });
  return;
}
