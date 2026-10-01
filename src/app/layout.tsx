import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mirim in",
  description:
    "디지털 새싹 바이브 코딩 : AI 소셜 임팩트 프로젝트 프로그램의 기획 확장 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
