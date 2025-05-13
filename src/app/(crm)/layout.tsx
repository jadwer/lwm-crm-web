import Header from "./ui/header/header";
import SideNav from "./ui/sideNav/nav.html";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedLayout>
      <div className="d-flex align-items-stretch">
        <SideNav />
        <div className="container">
          <Header />
          {children}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
