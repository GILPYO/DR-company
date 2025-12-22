import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./lib/utils/QueryProvider";
import Gnb from "./components/Gnb/Gnb";
import localFont from "next/font/local";
import { Footer } from "./components/Footer/Footer";

export const metadata: Metadata = {
  title: "용광산업",
  description: "용광산업 홈페이지",
};

const pretendard = localFont({
  src: "../../static/font/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <QueryProvider>
        <body
          className={`${pretendard.variable} ${pretendard.className} flex flex-col items-center justify-center w-full mx-auto`}
        >
          <Gnb />
          {children}
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
