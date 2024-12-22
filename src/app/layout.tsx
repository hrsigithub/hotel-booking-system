// src/app/layout.tsx
import './globals.css'; // Tailwind の CSS ファイルをインポート

export const metadata = {
  title: 'Hotel Booking System',
  description: 'A Next.js hotel booking application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
