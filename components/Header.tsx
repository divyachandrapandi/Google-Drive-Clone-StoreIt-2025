"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const path = usePathname();
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper flex-center">
        <FileUploader ownerId={userId} accountId={accountId} />

        {path !== "/guests" && (
          <form
            action={async () => {
              // "use server";

              await signOutUser();
            }}
          >
            <Button
              type="submit"
              className="sign-out-button flex-center cursor-pointer"
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
                className="w-6"
              />
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};
export default Header;
