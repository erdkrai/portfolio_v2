import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
import SocialIcon from "@/components/ui/social-icons";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { urlFor } from "@/sanity/lib/image";
import { FOOTER_QUERYResult } from "@/sanity.types";

interface FooterProps {
  footerData?: FOOTER_QUERYResult;
}

interface NavigationLink {
  label?: string | null;
  href?: string | null;
  target?: boolean | null;
}

interface SocialLink {
  platform?: string | null;
  url?: string | null;
}

export default function Footer({ footerData }: FooterProps) {
  // Don't render footer if showFooter is false or no data
  if (!footerData?.showFooter) {
    return null;
  }

  return (
    <footer>
      <div className="dark:bg-background pb-5 xl:pb-5 dark:text-gray-300">
        {/* Logo Section */}
        {(footerData.logoImage || footerData.logoText) && (
          <div className="flex justify-center">
            <Link
              className="block w-[6.25rem] mx-auto"
              href="/"
              aria-label="Home page"
            >
              {footerData.logoType === "image" && footerData.logoImage?.asset ? (
                <Image
                  src={urlFor(footerData.logoImage).url()}
                  alt={footerData.logoImage.alt || "Logo"}
                  width={100}
                  height={40}
                  className="w-auto h-auto max-w-[6.25rem]"
                  placeholder={footerData.logoImage?.asset?.metadata?.lqip ? "blur" : undefined}
                  blurDataURL={footerData.logoImage?.asset?.metadata?.lqip || ""}
                />
              ) : footerData.logoType === "text" && footerData.logoText ? (
                <span className="text-xl font-bold">{footerData.logoText}</span>
              ) : (
                <Logo />
              )}
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        {footerData.navigationLinks && footerData.navigationLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
            {footerData.navigationLinks.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.href || "#"}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
              >
                {navItem.label}
              </Link>
            ))}
          </div>
        )}

        {/* Social Media Links */}
        {footerData.socialLinks && footerData.socialLinks.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            {footerData.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                aria-label={`Visit our ${social.platform} page`}
              >
                <SocialIcon platform={social.platform || ""} />
              </Link>
            ))}
          </div>
        )}

        {/* Footer Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs border-t pt-8">
          {/* Copyright Text */}
          {footerData.copyrightText && footerData.copyrightText.length > 0 && (
            <div className="text-foreground/60">
              <PortableTextRenderer value={footerData.copyrightText} />
            </div>
          )}

          {/* Additional Content */}
          {footerData.additionalContent && footerData.additionalContent.length > 0 && (
            <div className="text-foreground/60">
              <PortableTextRenderer value={footerData.additionalContent} />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
