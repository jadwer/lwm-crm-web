import type { Metadata } from "next";
import "@/styles/main.css";
import BootStrapClient from '@/components/BootStrapClient';
import Header from "./ui/header/header";
import Footer from "./ui/footer/footer.html";
import Contact from "./ui/contact/contact.html";
import TopNav from "./ui/topNav/nav.html";
import Estimate from "./ui/estimate/estimate.html";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
      <TopNav />
      <Contact />
      <Estimate />
        {children}
        <BootStrapClient />
      <Footer />
      </body>
    </html>
  );
}
