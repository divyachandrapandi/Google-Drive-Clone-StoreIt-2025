"use client";

import Link from "next/link";
import Image from "next/image";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar remove-scrollbar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav h5">
        <ul className="flex flex-1 flex-col gap-6">
          {pathname !== "/guests" ? (
            navItems.map(({ url, name, icon }) => (
              <Link key={name} href={url} className="lg:w-full">
                <li
                  className={cn(
                    "sidebar-nav-item h5",
                    pathname === url && "shad-active",
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn(
                      "nav-icon",
                      pathname === url && "nav-icon-active",
                    )}
                  />
                  <p className="hidden lg:block">{name}</p>
                </li>
              </Link>
            ))
          ) : (
            <Link
              key={"guest-dashboard"}
              href={"/guests"}
              className="lg:w-full"
            >
              <li
                className={cn(
                  "sidebar-nav-item h5",
                  pathname === "/guests" && "shad-active",
                )}
              >
                <Image
                  src={"/assets/icons/others.svg"}
                  alt={"guests-path"}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === "/guests" && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block">Guest Dashboard</p>
              </li>
            </Link>
          )}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar || avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">
            {fullName ? fullName : "Guest Profile"}
          </p>
          <p className="caption">
            {email ? email : "Please Login to see more options"}
          </p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
