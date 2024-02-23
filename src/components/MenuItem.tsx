"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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

const MenuItem = () => {
  const pathName = usePathname();
  return (
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
  );
};

export default MenuItem;
