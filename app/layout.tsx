import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const BASE_URL = "https://khatma-academy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "أكاديمية الختمة الذهبية | تحفيظ القرآن الكريم أونلاين",
    template: "%s | أكاديمية الختمة الذهبية",
  },
  description:
    "أكاديمية الختمة الذهبية تقدم برامج حفظ ومراجعة وتجويد للقرآن الكريم أونلاين، إشراف نخبة من المحفظين والمحفظات المتخصصين، لجميع الأعمار والمستويات.",
  keywords: [
    "تحفيظ القرآن أونلاين",
    "حفظ القرآن",
    "أكاديمية قرآن",
    "تجويد أونلاين",
    "الختمة الذهبية",
  ],
  openGraph: {
    title: "أكاديمية الختمة الذهبية",
    description: "رحلة متكاملة لحفظ القرآن الكريم أونلاين.",
    url: BASE_URL,
    siteName: "أكاديمية الختمة الذهبية",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية الختمة الذهبية",
    description: "رحلة متكاملة لحفظ القرآن الكريم أونلاين.",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0F6B4B",
  width: "device-width",
  initialScale: 1,
};

// بيانات منظمة (Structured Data) تصف الأكاديمية كمؤسسة تعليمية لمحركات البحث
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "أكاديمية الختمة الذهبية",
  url: BASE_URL,
  description: "منصة تعليمية لتحفيظ القرآن الكريم أونلاين.",
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
