'use client'

import HeaderTemplate from "./header.html";
import { useAuth } from "@/hooks/auth";

const Header = (props: any) => {
  const { logout } = useAuth();
  return (
    <HeaderTemplate functions={{logout}} />
  );
};

export default Header;
