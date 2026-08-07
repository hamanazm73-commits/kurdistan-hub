import type { Metadata, Viewport } from "next";
import { Noto_Naskh_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kurdistanonline.com"),
  title: "کوردستان ئۆنڵاین · كردستان أونلاين · Kurdistan Online",
  description:
    "هۆتێلەکانی کوردستان و نووسینگەی ئۆنڵاین — هەموو خزمەتگوزارییەکانمان لە یەک شوێن. فنادق كردستان والعقارات · Hotels and real estate across Kurdistan.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "کوردستان ئۆنڵاین · Kurdistan Online",
    description: "هۆتێل و خانووبەرە لە کوردستان — هەمووی لە یەک شوێن.",
  },
};

export const viewport: Viewport = { themeColor: "#06121f" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ku" dir="rtl" suppressHydrationWarning>
      <body className={`${sans.variable} ${arabic.variable} min-h-dvh antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
