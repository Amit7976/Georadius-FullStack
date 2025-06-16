import { redirect } from "next/navigation";
import MainContent from "./MainContent";
import { auth } from "@/src/auth";
import type { Metadata } from "next";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Sign Up | Geo Radius News",
  description:
    "Join Geo Radius News and be a part of your neighborhood’s trusted news network. Share, verify, and stay updated with real-time local stories.",
  keywords: [
    "sign up",
    "Geo Radius News sign up",
    "create account",
    "register",
    "hyperlocal news account",
    "join community news",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/signup",
  },
  openGraph: {
    title: "Sign Up | Geo Radius News",
    description:
      "Create your Geo Radius News account and start sharing updates that matter to your local community.",
    url: "https://georadiusnews.vercel.app/signup",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Geo Radius News Sign Up",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Geo Radius News",
    description:
      "Be the voice of your neighborhood. Sign up now and join the hyperlocal news revolution.",
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
