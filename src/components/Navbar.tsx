"use client";
import React from "react";

import Link from "next/link";
// import Logo from "../../public/netflix_logo.svg";
// import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";
// import { getServerAuthSession } from "@/server/auth";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
// import MenuItem from "./MenuItem";
// import { getServerAuthSession } from "@/server/auth";
// import { useSession } from "next-auth/react";
// import UserNav from "./UserNav";
interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Movies", href: "/movies" },
  { name: "Recently Added", href: "/recently" },
  { name: "My List", href: "/user/list" },
  { name: "Admin Page", href: "/admin" },
];

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;
  const pathName = usePathname();
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <Link href="/" className="w-32">
          {/* <Image src={Logo} alt="Netflix logo" priority /> */}
          Netflix
        </Link>
        {/* <MenuItem /> */}
        <ul className="ml-14 hidden gap-x-4 lg:flex">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-slate-400 underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-sm font-normal text-gray-300"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-8">
        <Search className="h-5 w-5 cursor-pointer text-gray-300" />
        <Bell className="h-5 w-5 cursor-pointer text-gray-300" />
        <Link href="/api/auth/signin">Login</Link>

        {user ? <UserNav user={user} /> : ""}
      </div>
    </div>
  );
}
