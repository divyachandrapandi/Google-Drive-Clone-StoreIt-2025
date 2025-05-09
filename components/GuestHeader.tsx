"use client";
import React,  from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { avatarPlaceholderUrl } from '@/constants';

const GuestHeader = () => {
  const router = useRouter();
  const redirectGuest = () => {
    router.push("/sign-up"); // or any protected route to demo
  };

  return (
    <header className="header">

        <div className="w-full flex justify-end align-middle gap-10">
            <div className="sidebar-user-info !my-0 mx-[10rem]">

                <div className="hidden lg:block">
                    <p className="subtitle-2 capitalize">
                        {  "Dear Recruiters, Kind Attention" }
                    </p>
                    <p className="caption">
                        { "For Upload, Share, Delete, Rename and many other Options Please Login" }
                    </p>
                </div>
            </div>
            <Button
                type="submit"
                className="primary-btn form-submit-button"
                onClick={ redirectGuest }
            >
                { "Login" }
            </Button>
        </div>
    </header>
  );
};
export default GuestHeader;
