import { redirect } from "next/navigation";
import MainContent from "./MainContent";
import { auth } from "@/src/auth";
import type { Metadata } from "next";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Login | Geo Radius News",
  description:
    "Access your Geo Radius News account to share, verify, and explore real-time hyperlocal updates from your community.",
  keywords: [
    "login",
    "Geo Radius News login",
    "user login",
    "hyperlocal news account",
    "sign in",
    "community news access",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/login",
  },
  openGraph: {
    title: "Login | Geo Radius News",
    description:
      "Log in to join your local news network. Share stories, verify updates, and connect with your community.",
    url: "https://georadiusnews.vercel.app/login",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Geo Radius News Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Geo Radius News",
    description: "Securely log in to your Geo Radius News account.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {

  const session = await auth()
  if (session?.user) {
    redirect("/")
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <>
        <MainContent />
      </>
    </>
  );
}
