// "use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./SignOutButton";
// import { signOut } from "next-auth/react";
// import SignOutButton from "./SignOutButton";
// import { signOut, useSession } from "next-auth/react";

interface UserNavProps {
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const UserNav = ({ user }: UserNavProps) => {
  // const session = useSession();
  if (!user) return;
  // const user = session.data?.user;
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-6 w-6 rounded">
          <Avatar className="h-6 w-6 rounded">
            <AvatarImage src={user.image ? user.image : ""} />
            <AvatarFallback className="rounded-sm">
              {user.email?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
