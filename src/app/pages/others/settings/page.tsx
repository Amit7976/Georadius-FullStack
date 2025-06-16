import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from './MainContent';
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Settings | Geo Radius News",
  description: "Manage your account preferences, notifications, privacy settings, and more on Geo Radius News.",
  keywords: ["settings", "account preferences", "Geo Radius News", "manage notifications", "user settings"],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/settings",
  },
  openGraph: {
    title: "Settings | Geo Radius News",
    description: "Update your profile, customize your preferences, and control your experience.",
    url: "https://georadiusnews.vercel.app/settings",
    siteName: "Geo Radius News",
    images: [{
      url: "https://georadiusnews.vercel.app/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Geo Radius News Settings"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Settings | Geo Radius News",
    description: "Access your account settings and manage your experience.",
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