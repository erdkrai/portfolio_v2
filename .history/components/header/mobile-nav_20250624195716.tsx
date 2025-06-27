"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import Logo from "@/components/logo";
import { useState } from "react";
import { AlignRight, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleLinkClick = () => {
    setOpen(false);
    setExpandedItems([]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none space-y-2">
              {navItems.map((navItem) => {
                const hasSubmenu = navItem.submenuItems && navItem.submenuItems.length > 0;
                const isExpanded = expandedItems.includes(navItem.label);

                return (
                  <li key={navItem.label}>
                    {hasSubmenu ? (
                      <div>
                        <button
                          onClick={() => toggleExpanded(navItem.label)}
                          className="flex items-center justify-between w-full px-4 py-3 text-left text-lg hover:bg-muted/50 rounded-md transition-colors"
                        >
                          <span>{navItem.label}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        
                        {/* Submenu Items */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="pl-4 pt-2 space-y-1">
                            {navItem.submenuItems?.map((submenuItem) => (
                              <Link
                                key={submenuItem.label}
                                onClick={handleLinkClick}
                                href={submenuItem.href || "#"}
                                target={submenuItem.target ? "_blank" : undefined}
                                rel={submenuItem.target ? "noopener noreferrer" : undefined}
                                className="block px-4 py-2 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
                              >
                                <div className="font-medium">{submenuItem.label}</div>
                                {submenuItem.description && (
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {submenuItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        onClick={handleLinkClick}
                        href={navItem.href || "#"}
                        target={navItem.target ? "_blank" : undefined}
                        rel={navItem.target ? "noopener noreferrer" : undefined}
                        className="block px-4 py-3 text-lg hover:bg-muted/50 rounded-md transition-colors"
                      >
                        {navItem.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
