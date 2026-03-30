"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "#impact", label: "Impact" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const reduce = useReducedMotion();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 font-semibold tracking-tight"
        >
          <span className="bg-primary/10 text-primary ring-primary/20 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ring-1 transition group-hover:bg-primary/15">
            GW
          </span>
          <span className="hidden truncate sm:inline">Gemechis Worku</span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduce ? 0 : 0.05 * i,
                duration: 0.35,
              }}
            >
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-2.5 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.05 * nav.length, duration: 0.35 }}
          >
            <Link
              href="/admin"
              className="text-primary rounded-md px-2.5 py-2 text-sm font-medium hover:underline"
            >
              Admin
            </Link>
          </motion.div>
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/admin"
            className="text-primary hover:bg-accent rounded-md px-2 py-1.5 text-xs font-medium lg:hidden"
          >
            CMS
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            disabled={!mounted}
          >
            {isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
