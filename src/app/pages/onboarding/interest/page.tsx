import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from "./MainContent";
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Select Your Interests | Geo Radius News",
  description:
    "Choose topics that matter to you. Personalize your feed with the latest hyperlocal news tailored to your interests.",
  keywords: [
    "Geo Radius News interests",
    "select interests",
    "personalize news feed",
    "local news preferences",
    "news topics selection",
    "community-powered updates",
    "hyperlocal news interests",
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/interest",
  },
  openGraph: {
    title: "Select Your Interests | Geo Radius News",
    description:
      "Make Geo Radius News truly yours by selecting the topics you care about. Get real-time, local news updates that matter to you.",
    url: "https://georadiusnews.vercel.app/interest",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Geo Radius News - Interest Selection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Your Interests | Geo Radius News",
    description:
      "Personalize your hyperlocal news feed by choosing the topics that interest you the most.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function Home() {

  const session = await auth();
  if (!session?.user) redirect("/pages/auth/signin");

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  if (session.user.username === false) {
    redirect("/pages/onboarding/createprofile");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainContent />
    </>
  );
}
