import { PortableText, PortableTextProps } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Highlight, themes } from "prism-react-renderer";
import { CopyButton } from "@/components/ui/copy-button";
import Callout from "@/components/blocks/content/callout";
import Toggle from "@/components/blocks/content/toggle";
import ContentButton from "@/components/blocks/content/button";
import Tabs from "@/components/blocks/content/tabs";
import Table from "@/components/blocks/content/table";
import PortfolioGallery from "@/components/blocks/content/portfolio-gallery";

const portableTextComponents: PortableTextProps["components"] = {
  types: {
    image: ({ value }) => {
      const { url, metadata } = value.asset;
      const { lqip, dimensions } = metadata;
      return (
        <Image
          src={url}
          alt={value.alt || "Image"}
          width={dimensions.width}
          height={dimensions.height}
          placeholder={lqip ? "blur" : undefined}
          blurDataURL={lqip || undefined}
          style={{
            borderRadius: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          quality={100}
        />
      );
    },
    youtube: ({ value }) => {
      const { videoId } = value;
      return (
        <div className="aspect-video max-w-[45rem] rounded-xl overflow-hidden mb-4">
          <YouTubeEmbed videoid={videoId} params="rel=0" />
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <div className="grid my-4 overflow-x-auto rounded-lg border border-border text-xs lg:text-sm bg-primary/80 dark:bg-muted/80">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-primary/80 dark:bg-muted">
            <div className="text-muted-foreground font-mono">
              {value.filename || ""}
            </div>
            <CopyButton code={value.code} />
          </div>
          <Highlight
            theme={themes.vsDark}
            code={value.code}
            language={value.language || "typescript"}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                style={{
                  ...style,
                  padding: "1.5rem",
                  margin: 0,
                  overflow: "auto",
                  backgroundColor: "transparent",
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      );
    },
    callout: ({ value }) => {
      return (
        <Callout
          type={value.type}
          title={value.title}
          content={value.content}
          dismissible={value.dismissible}
        />
      );
    },
    toggle: ({ value }) => {
      return (
        <Toggle
          title={value.title}
          content={value.content}
          defaultOpen={value.defaultOpen}
          style={value.style}
        />
      );
    },
    button: ({ value }) => {
      return (
        <ContentButton
          text={value.text}
          link={value.link}
          variant={value.variant}
          size={value.size}
          fullWidth={value.fullWidth}
          alignment={value.alignment}
        />
      );
    },
    tabs: ({ value }) => {
      return (
        <Tabs
          style={value.style}
          tabItems={value.tabItems}
          defaultTab={value.defaultTab}
        />
      );
    },
    table: ({ value }) => {
      return (
        <Table
          caption={value.caption}
          headers={value.headers}
          rows={value.rows}
          style={value.style}
          size={value.size}
          responsive={value.responsive}
        />
      );
    },
    "portfolio-gallery": ({ value }) => {
      return (
        <PortfolioGallery
          title={value.title}
          description={value.description}
          layout={value.layout}
          columns={value.columns}
          spacing={value.spacing}
          aspectRatio={value.aspectRatio}
          enableLightbox={value.enableLightbox}
          enableCategories={value.enableCategories}
          hoverEffect={value.hoverEffect}
          items={value.items}
        />
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p style={{ marginBottom: "1rem" }}>{children}</p>
    ),
    h1: ({ children }) => (
      <h1 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 style={{ marginBottom: "1rem", marginTop: "1rem" }}>{children}</h5>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal =
        (value?.href || "").startsWith("http") ||
        (value?.href || "").startsWith("https") ||
        (value?.href || "").startsWith("mailto");
      const target = isExternal ? "_blank" : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          rel={target ? "noopener" : undefined}
          style={{ textDecoration: "underline" }}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "decimal",
          listStylePosition: "inside",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
  },
};

const PortableTextRenderer = ({
  value,
}: {
  value: PortableTextProps["value"];
}) => {
  return <PortableText value={value} components={portableTextComponents} />;
};

export default PortableTextRenderer;
