// app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yubawatershedinstitute.org"),
  title: { default: "Yuba Watershed Institute", template: "%s | YWI" },
  description: "Ecological restoration and wildfire resilience in the Yuba watershed.",
  openGraph: { type: "website", siteName: "Yuba Watershed Institute", url: "/" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Yuba Watershed Institute",
          url: "https://www.yubawatershedinstitute.org",
          logo: "https://www.yubawatershedinstitute.org/images/logo.png",
        }} />
      </head>

      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <div className="flex min-h-dvh flex-col">
          <Navbar />                 {/* ← header back */}
          <main className="flex-1">{children}</main>
          <Footer />                 {/* ← footer back */}
        </div>
      </body>
    </html>
  );
}
