import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";
import MainContent from "./MainContent";
import { Metadata } from "next";



/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
  title: "Live News Map | Geo Radius News",
  description: "Discover trending local stories on the interactive map. Zoom into neighborhoods and explore real-time community updates.",
  keywords: ["map news", "location based news", "live news map", "Geo Radius Map", "hyperlocal updates"],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/map",
  },
  openGraph: {
    title: "Live News Map | Geo Radius News",
    description: "See what’s happening around you with our interactive hyperlocal map.",
    url: "https://georadiusnews.vercel.app/map",
    siteName: "Geo Radius News",
    images: [{
      url: "https://georadiusnews.vercel.app/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Geo Radius Map"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live News Map | Geo Radius News",
    description: "Explore news stories by location on the map.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {
  
  const cookieStore = await cookies();
  const onboarding = cookieStore.get("onboarding")?.value;
  const LPS = cookieStore.get("LPS")?.value;

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!onboarding) redirect("/pages/onboarding/getstarted");
  if (!LPS) redirect("/pages/onboarding/permissions/location");

  /////////////////////////////////////////////////////////////////////////////////////////////////////

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
