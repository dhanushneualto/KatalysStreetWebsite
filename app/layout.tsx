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
    <html lang="en" className="dark">
      <body>
        {/* 
          ✅ GTM (noscript) Fallback 
          Placed immediately after the opening <body> tag for users with JS disabled 
        */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRW3PPHK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* 
          ✅ GTM Script 
          Uses Next.js Script component to inject into the document safely
        */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WRW3PPHK');
            `,
          }}
        />

        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}