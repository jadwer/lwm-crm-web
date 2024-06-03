import type { Metadata } from "next";
import "../styles/main.css";
import BootStrapClient from '@/components/BootStrapClient';
import Header from "./(front)/ui/header/header";
import Footer from "./(front)/ui/footer/footer.html";
import Contact from "./(front)/ui/contact/contact.html";
import TopNav from "./(front)/ui/topNav/nav.html";
import Estimate from "./(front)/ui/estimate/estimate.html";

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
