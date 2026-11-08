import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
export const metadata: Metadata = {
  title: "Pablo Álvaro Hidalgo | Data & Digital Analyst",
  description:
    "CV de Pablo Álvaro Hidalgo. Data & Digital Analyst en Ryanair: SQL, Databricks, Power BI y Analytics Engineering.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Pablo Álvaro Hidalgo",
    description: "Data & Digital Analyst | Analytics Engineering",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_GB"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
