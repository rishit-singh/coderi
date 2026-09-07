import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coderi — AI Logistics for Ecommerce",
  description: "AI-powered carrier selection and shipping optimization for small ecommerce sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
