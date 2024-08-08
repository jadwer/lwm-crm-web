import type { Metadata } from "next";
import "../styles/main.css";
import BootStrapClient from '@/components/BootStrapClient';
import 'animate.css'

export const metadata: Metadata = {
  title: "Labor Wasser México.",
  description: "By AtomoSoluciones.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootStrapClient />
      </body>
    </html>
  );
}
