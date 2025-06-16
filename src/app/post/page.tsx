import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";
import MainContent from "./MainContent";
import { t } from "@/src/helpers/i18n";
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
  title: "Add New Post | Geo Radius News",
  description:
    "Share real-time local news with your community. Submit a new post on Geo Radius News and keep your neighborhood informed.",
  keywords: [
    "add local news post",
    "submit news",
    "create news post",
    "Geo Radius News",
    "hyperlocal news",
    "community news platform",
    "post update near me"
  ],
  alternates: {
    canonical: "https://georadiusnews.vercel.app/add",
  },
  openGraph: {
    title: "Add a Post | Geo Radius News",
    description:
      "Submit your news post and contribute to real-time local reporting. For the people, by the people.",
    url: "https://georadiusnews.vercel.app/add",
    siteName: "Geo Radius News",
    images: [
      {
        url: "https://georadiusnews.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Geo Radius News - Add Post",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add a Post | Geo Radius News",
    description:
      "Help your neighborhood stay informed — add your news post now.",
    images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {

  const cookieStore = await cookies();

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const LPS = cookieStore.get("LPS")?.value;
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
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold text-black dark:text-white">{t("reportNews")}</h1>
      </div>
      <MainContent />
    </>
  );
}
