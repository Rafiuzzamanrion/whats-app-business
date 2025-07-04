"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAuth } from "@/app/hooks/use-auth";

export const Navbar = () => {
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;

  const { user } = useAuth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-10 max-w-fit mr-5">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="Picture of the author"
              height={30}
              src="/whatsapp.png"
              width={30}
            />
            <p className="font-bold text-inherit">WAPI Cloud</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-6 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  `${isActive(item.href) && "text-success font-bold transition-colors"}` +
                    "hover:text-success",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {!user? (
            <Button color={"success"} size={"sm"} variant={"shadow"}>
              <NextLink className="flex items-center gap-1" href="/login">
                Login
              </NextLink>
            </Button>
          ) : (
            <Button
              color={"danger"}
              size={"sm"}
              variant={"shadow"}
              onPress={() => signOut()}
            >
              log out
            </Button>
          )}
          <Button color={"primary"} size={"sm"} variant={"shadow"}>
            <NextLink className="flex items-center gap-1" href="/auth/signin">
              Get Started
            </NextLink>
          </Button>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {!user ? (
          <Button color={"success"} size={"sm"} variant={"shadow"}>
            <NextLink className="flex items-center gap-1" href="/login">
              Login
            </NextLink>
          </Button>
        ) : (
          <Button
            color={"danger"}
            size={"sm"}
            variant={"shadow"}
            onPress={() => signOut()}
          >
            log out
          </Button>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
