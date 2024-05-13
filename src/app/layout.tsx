import type { Metadata } from "next";
import "../styles/main.css";
import BootStrapClient from '@/components/BootStrapClient';

export const metadata: Metadata = {
  title: "Me deben y les debo: La app de las cuentas claras.",
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
