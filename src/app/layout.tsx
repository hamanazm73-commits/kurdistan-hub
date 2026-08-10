import type { Metadata, Viewport } from "next";
import { Noto_Naskh_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

const sans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Each page sets its own title in its own language; this is only the
  // fallback if one ever forgets to.
  title: "لای حەمە · عند حمة · Lay Hama",
  description:
    "هۆتێلەکانی لای حەمە و نووسینگەی لای حەمە — هەموو خزمەتگوزارییەکانمان لە یەک شوێن. الفنادق والعقارات في كردستان · Hotels and homes across Kurdistan.",
  applicationName: "Lay Hama",
  keywords: [
    "لای حەمە", "هۆتێل", "خانووبەرە", "هەولێر", "سلێمانی", "دهۆک", "کەرکووک",
    "عند حمة", "فنادق", "عقارات", "كردستان", "أربيل",
    "Lay Hama", "hotels", "real estate", "Kurdistan", "Erbil", "Iraq",
  ],
  openGraph: { siteName: "Lay Hama", type: "website" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
