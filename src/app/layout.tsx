import type { Metadata } from "next";
import BootStrapClient from "@/components/BootStrapClient";
import Script from "next/script";
import "../styles/main.css";
import "animate.css";

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M1SCXB58G4"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M1SCXB58G4');
`}
        </Script>
      </head>
      <body>
        {children}
        <BootStrapClient />
      </body>
    </html>
  );
}
