"use client";

import { useRouter } from "next/navigation";
import HeaderTemplate from "./header.html";
import { useAuth } from "@/hooks/auth";

const Header = (props: any) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return <HeaderTemplate functions={{ logout }} user={user} />;
};

export default Header;
