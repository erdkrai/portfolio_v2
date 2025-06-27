import Header from "@/components/header";
import Footer from "@/components/footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/fetch";
import { FOOTER_QUERY } from "@/sanity/queries/footer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await sanityFetch({
    query: FOOTER_QUERY,
    stega: (await draftMode()).isEnabled,
  });

  return (
    <>
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer footerData={footerData} />
    </>
  );
}
