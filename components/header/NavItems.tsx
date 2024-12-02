import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemsProps {
  navItemsData: Array<{ name: string; href: string }>;
  isMobile?: boolean;
  toggleMenu?: () => void;
}

const NavItems = ({ navItemsData, isMobile, toggleMenu }: NavItemsProps) => {
  const currentPathname = usePathname();
  const isActive = (href: string) => {
    return href === currentPathname;
  };

  return (
    <>
      {/* NavItems */}
      <ul
        className={cn(
          "flex items-center",
          isMobile === true
            ? "flex-col justify-center mt-40 gap-y-8"
            : "flex-row  gap-x-8"
        )}
      >
        {navItemsData.map((item) => (
          <li key={item.name} className="text-base font-medium">
            <Link
              href={item.href}
              onClick={toggleMenu}
              className={cn(
                isActive(item.href)
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "",
                "hover:text-emerald-300 dark:hover:text-emerald-200",
                "transition duration-200 ease-in-out"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavItems;
