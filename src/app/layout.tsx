import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coderi — AI Shipping Intelligence',
  description: 'AI-powered logistics optimization for small ecommerce sellers. Save up to 40% on shipping costs with smart carrier selection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
