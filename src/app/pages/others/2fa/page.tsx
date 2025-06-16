import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from './MainContent';
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
  title: "2FA Security | Geo Radius News",
  description: "Secure your account with two-factor authentication and stay protected on Geo Radius News.",
  keywords: ["2FA", "two factor authentication", "account security", "Geo Radius News", "secure login"],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/settings/2fa",
  },
  openGraph: {
    title: "2FA Security | Geo Radius News",
    description: "Add an extra layer of protection to your account with 2FA.",
    url: "https://georadiusnews.vercel.app/settings/2fa",
    siteName: "Geo Radius News",
    images: [{
      url: "https://georadiusnews.vercel.app/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "2FA Setup"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2FA Security | Geo Radius News",
    description: "Enable two-factor authentication for added account safety.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {

  const session = await auth();
  if (!session?.user) redirect("/pages/auth/signin");

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainContent />
    </>
  );
}