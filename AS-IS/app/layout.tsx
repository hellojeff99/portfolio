import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HELLOJEFF99",
    description: "Portfolio, Resume, Blog",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={geist.className}>
        <style>{`
          @media print {
            nav { display: none !important; }
            button { display: none !important; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            @page { margin: 10mm; }
          }
        `}</style>
        <Navbar />
        <ScrollToTop />
        <main className={"mb-4"}>{children}</main>
        </body>
        </html>
    );
}