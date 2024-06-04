import "@/styles/main.css";
import BootStrapClient from "@/components/BootStrapClient";
import Header from "./ui/header/header";
import SideNav from "./ui/sideNav/nav.html";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="d-flex align-items-stretch">
          <SideNav />
          <div className="container">
          <Header />
          {children}
          </div>
        </div>
  );
}
