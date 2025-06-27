"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/types";
import { cn } from "@/lib/utils";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Small delay to allow moving to dropdown
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      {navItems.map((navItem) => {
        const hasSubmenu = navItem.submenuItems && navItem.submenuItems.length > 0;
        const isOpen = openDropdown === navItem.label;

        return (
          <div
            key={navItem.label}
            className="relative"
            onMouseEnter={() => hasSubmenu && handleMouseEnter(navItem.label)}
            onMouseLeave={hasSubmenu ? handleMouseLeave : undefined}
          >
            {hasSubmenu ? (
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 text-sm",
                  isOpen && "text-foreground"
                )}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {navItem.label}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                href={navItem.href || "#"}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
              >
                {navItem.label}
              </Link>
            )}

            {/* Dropdown Menu */}
            {hasSubmenu && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg transition-all duration-200 z-50",
                  isOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}
              >
                <div className="py-2">
                  {navItem.submenuItems?.map((submenuItem) => (
                    <Link
                      key={submenuItem.label}
                      href={submenuItem.href || "#"}
                      target={submenuItem.target ? "_blank" : undefined}
                      rel={submenuItem.target ? "noopener noreferrer" : undefined}
                      className="block px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <div className="font-medium">{submenuItem.label}</div>
                      {submenuItem.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {submenuItem.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
