import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";
import MainContent from "./MainContent";
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: 'Search News — Geo Radius News',
    description:
        'Search HyperLocal news from your neighborhood and beyond. Find verified, community-powered updates by location, keywords, or category — in real-time.',
    keywords: [
        'search local news',
        'geo radius search',
        'hyperlocal news search',
        'location based news',
        'community news updates',
        'verified neighborhood news',
        'live news search',
        'geo news feed',
    ],
    alternates: {
        canonical: 'https://georadiusnews.vercel.app/search',
    },
    openGraph: {
        title: 'Search News — Geo Radius News',
        description:
            'Search HyperLocal news updates near you. Get real-time, verified stories shared by your local community.',
        url: 'https://georadiusnews.vercel.app/search',
        siteName: 'Geo Radius News',
        images: [
            {
                url: 'https://georadiusnews.vercel.app/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'Geo Radius News Search Page',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Search News — Geo Radius News',
        description:
            'Discover neighborhood news using our smart search. Get real-time, geo-targeted updates shared by people around you.',
        images: ['https://georadiusnews.vercel.app/opengraph-image.png'],
    },
};
  


//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
