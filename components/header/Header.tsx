"use client";

import { useState } from "react";
import ModeToggle from "../ToogleMode";

import { useModalStore } from "@/zustand/useModalStore";
import { CiMenuFries } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavItems from "./NavItems";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const navItemsData = [
  { name: "Inicio", href: "/" },
  { name: "Cursos", href: "/courses" },
  { name: "Sobre nosotros", href: "/about" },
  { name: "Política de privacidad", href: "/policy" },
  { name: "Preguntas frecuentes", href: "/faq" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const { openModal } = useModalStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-950  sticky top-0 z-10 h-20 border-b border-b-black/10 dark:border-b-white/10 ">
        {/* Desktop menu */}
        <div className="container px-4 sm:px-0 mx-auto flex justify-between items-center h-full">
          {/* Menu */}
          <div className="flex items-center gap-x-14">
            <div className="hover:cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 hover:transition-all hover:duration-200">
              <h2 className="text-xl md:text-2xl font-bold">Elearning</h2>
            </div>
            <div className="hidden lg:flex items-center">
              <NavItems navItemsData={navItemsData} isMobile={false} />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            {/* Switch mode */}
            <ModeToggle />

            {/* Avatar */}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-x-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.avatar.url} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium leading-none">
                      Hola, {user.name}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emeraold-700 text-white px-4 py-2 rounded-md"
                onClick={() => openModal("login")}
              >
                Acceder
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet onOpenChange={setIsOpen} open={isOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <CiMenuFries className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="hidden">
                  <SheetTitle />
                </SheetHeader>
                <NavItems
                  navItemsData={navItemsData}
                  isMobile={true}
                  toggleMenu={handleToggleMenu}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
    </>
  );
};

export default Header;
