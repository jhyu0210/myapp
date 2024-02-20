"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
// import Logo from "../../public/netflix_logo.svg";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";
// import UserNav from "./UserNav";

interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: "Home", href: "/" },
  { name: "Tv Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/list" },
];

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <Link href="/" className="w-32">
          {/* <Image src={Logo} alt="Netflix logo" priority /> */}
          Netflix
        </Link>
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
        <UserNav />
      </div>
    </div>
  );
}
