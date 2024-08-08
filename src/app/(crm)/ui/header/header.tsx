'use client'

import { useRouter } from "next/navigation";
import HeaderTemplate from "./header.html";
import { useAuth } from "@/hooks/auth";

const Header = (props: any) => {
  //const { logout } = useAuth();
  const router = useRouter();
  const logout = () => {router.push('/')};
  return (
    <HeaderTemplate functions={{logout}} />
  );
};

export default Header;
