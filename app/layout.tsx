import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./smoothscroll";

export const metadata: Metadata = {
  title: "Katalyst Street",
  description: "Reducing IT Complexity in the age of AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark " >
      <body>
        {/* 
          ✅ GA4 GTAG – Load the external script asynchronously 
          "afterInteractive" loads after page becomes interactive
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V35CD4WFTK"
          strategy="afterInteractive"
        />

        {/* 
          ✅ GA4 CONFIGURATION – Inline script that runs after the external script 
          The 'id' prevents duplication during hot-reload 
        */}
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V35CD4WFTK');
            `,
          }}
        />
         <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
