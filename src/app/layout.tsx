import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KEI-SAGA | 한국사 RPG 학습",
  description:
    "한국의 역사를 RPG로 배우는 몰입형 학습 웹앱. 퀴즈를 풀고 경험치를 쌓아 역사 속 영웅이 되어보세요.",
  keywords: ["한국사", "역사", "RPG", "학습", "퀴즈", "교육"],
  openGraph: {
    title: "KEI-SAGA | 한국사 RPG 학습",
    description: "한국의 역사를 RPG로 배우는 몰입형 학습 웹앱",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
