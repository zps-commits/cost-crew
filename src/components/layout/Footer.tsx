"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BRAND, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-olive-deep text-bone/80"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-bone">
              <Logo showTagline />
            </div>
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-bone/90 sm:text-3xl">
              Premium oversized essentials for the days that feel endless.
            </p>
            <form
              className="mt-8 flex max-w-sm items-center gap-2 border-b border-bone/25 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="w-full bg-transparent text-sm text-bone placeholder:text-bone/40 focus:outline-none"
              />
              <button
                type="submit"
                className="label text-bone/70 transition-colors hover:text-bone"
              >
                Join
              </button>
            </form>
          </div>

          <div>
            <p className="label text-bone/50">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-bone/50">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-bone/70">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors hover:text-bone"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-bone/15 pt-8 text-xs text-bone/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Cost Crew. All rights reserved.</p>
          <p className="label !text-[0.62rem] text-bone/40">
            Find your coast.
          </p>
        </div>
      </div>
    </footer>
  );
}
