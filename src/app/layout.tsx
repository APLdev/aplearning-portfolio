import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "w8ufNFGy5DsU8-JS3OdCmqBv3b4TdRkDiI38pz6-E6M",
  },
  title: {
    default: "Cursos e-learning y SCORM para empresas | APLearning",
    template: "%s | APLearning",
  },
  description:
    "Transformo manuales, presentaciones y videos en cursos e-learning interactivos para empresas, con diseño a medida, locución y entrega SCORM lista para tu LMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
