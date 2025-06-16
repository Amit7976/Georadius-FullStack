import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";
import MainContent from "./MainContent";
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: "Rapid News Reels | Geo Radius News",
    description:
        "Experience news like never before. Swipe through short, fast-paced HyperLocal stories and stay updated in seconds!",
    keywords: [
        "rapid news",
        "news reels",
        "swipeable news",
        "short news",
        "hyperlocal news shorts",
        "Geo Radius News",
        "reel style news"
    ],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/rapid",
    },
    openGraph: {
        title: "Rapid News Reels | Geo Radius News",
        description:
            "Get your daily dose of quick, hyperlocal news. Swipe through fast, community-sourced updates just like Instagram reels.",
        url: "https://georadiusnews.vercel.app/rapid",
        siteName: "Geo Radius News",
        images: [
            {
                url: "https://georadiusnews.vercel.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Geo Radius News - Rapid Reels",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rapid News Reels | Geo Radius News",
        description:
            "Quick swipeable local news, just like reels. Stay informed — the fun way!",
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
            <MainContent />
        </>
    );
}
