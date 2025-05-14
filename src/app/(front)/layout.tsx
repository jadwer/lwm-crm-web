import Header from "./ui/header/header";
import Footer from "./ui/footer/footer.html";
import Contact from "./ui/contact/contact.html";
import TopNav from "./ui/topNav/nav.html";
import Estimate from "./ui/estimate/estimate.html";
import { CartProvider } from "@/context/CartContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <TopNav />
      <Contact />
      <Estimate />
      <CartProvider>{children}</CartProvider>
      <Footer />
    </>
  );
}
