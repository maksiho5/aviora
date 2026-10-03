"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { buttonClass } from "@/shared/ui/button";
import { Close, MenuIcon } from "@/shared/ui/icons";
import { LanguageSwitch } from "@/shared/ui/language-switch";
import { TelegramButton } from "@/shared/ui/telegram-button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const links = [
  { href: "/study", key: "study" },
  { href: "/life", key: "life" },
  { href: "/cities", key: "cities" },
  { href: "/practical", key: "practical" },
  { href: "/mentorship", key: "mentorship" },
  { href: "/team", key: "team" },
] as const;

function useHideOnScroll() {
  const [state, setState] = useState({ hidden: false, scrolled: false });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setState({ hidden: y > 64 && y > last, scrolled: y > 8 });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { hidden, scrolled } = useHideOnScroll();
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skip")}
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-bg transition-[translate,border-color] duration-[var(--dur-fast)] ease-[var(--ease-soft)]",
          scrolled ? "border-line" : "border-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="container-content flex h-16 items-center gap-6 lg:h-[72px]">
          <Link href="/" aria-label={t("home")} className="font-serif text-[1.75rem] font-semibold tracking-[0.02em] no-underline">
            Aviora
          </Link>

          <nav aria-label={t("primary")} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={isCurrent(href) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium no-underline transition-colors",
                      isCurrent(href) ? "text-text" : "text-muted hover:text-text",
                      "aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent",
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/first-30" className={buttonClass("primary", "hidden min-h-10 lg:inline-flex")}>
            {t("first30")}
          </Link>
          <LanguageSwitch className="ml-auto lg:ml-0" />
          <ThemeToggle className="hidden xl:inline-flex" />

          <button
            type="button"
            onClick={() => {
              menuRef.current?.showModal();
              setMenuOpen(true);
            }}
            aria-haspopup="dialog"
            className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] font-semibold lg:hidden"
          >
            <MenuIcon />
            {t("menu")}
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        onClose={() => setMenuOpen(false)}
        aria-label={t("menu")}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-text backdrop:bg-transparent open:animate-[fade-in_200ms_ease_both]"
      >
        <div className="container-content flex min-h-full flex-col pb-8">
          <div className="flex h-16 items-center justify-between">
            <span className="font-serif text-[1.75rem] font-semibold tracking-[0.02em]">Aviora</span>
            <button
              type="button"
              onClick={() => menuRef.current?.close()}
              className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 font-semibold"
            >
              <Close />
              {t("close")}
            </button>
          </div>
          <nav aria-label={t("primary")} className="mt-6 flex-1">
            <ul className="space-y-1">
              <li>
                <Link href="/first-30" className="t-display-l block py-2 text-accent no-underline">
                  First 30
                </Link>
              </li>
              {links.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={isCurrent(href) ? "page" : undefined}
                    className="block py-1.5 font-serif text-[2.25rem] italic leading-tight no-underline aria-[current=page]:text-accent"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <TelegramButton variant="link" />
            <ThemeToggle />
          </div>
        </div>
      </dialog>
    </>
  );
}
