import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from "./MainContent";
import type { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: "Saved News | Geo Radius News",
    description:
        "Access your bookmarked and saved news stories anytime. Stay updated on local events that matter most to you.",
    keywords: [
        "saved news",
        "bookmarked stories",
        "my news collection",
        "local news favorites",
        "geo radius saved posts",
        "read later news",
        "personalized news feed",
        "Geo Radius News",
    ],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/saved",
    },
    openGraph: {
        title: "Saved News | Geo Radius News",
        description:
            "Revisit the local news stories you've saved. Catch up on important community updates at your convenience.",
        url: "https://georadiusnews.vercel.app/saved",
        siteName: "Geo Radius News",
        images: [
            {
                url: "https://georadiusnews.vercel.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Saved News - Geo Radius",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Saved News | Geo Radius News",
        description:
            "Your personalized space to catch up on bookmarked local stories. Stay connected with what matters to you.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {

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
