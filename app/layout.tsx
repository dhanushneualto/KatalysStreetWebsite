import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
