import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ask Nish",
  description: "Ask any question. Get answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
