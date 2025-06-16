import type { Metadata } from "next";
import MainContent from './MainContent';


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: "Trending Now | Geo Radius News",
    description:
        "Catch the hottest local stories trending in your neighborhood. Stay ahead with breaking updates and top community-reported news.",
    keywords: [
        "trending local news",
        "top news near me",
        "hot news stories",
        "geo radius trending",
        "viral local updates",
        "breaking news",
        "community trending",
        "Geo Radius News",
    ],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/trending",
    },
    openGraph: {
        title: "Trending Now | Geo Radius News",
        description:
            "Stay in the loop with the most talked-about news around you. Real-time, community-powered trending stories you can't miss.",
        url: "https://georadiusnews.vercel.app/trending",
        siteName: "Geo Radius News",
        images: [
            {
                url: "https://georadiusnews.vercel.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Trending News - Geo Radius",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Trending Now | Geo Radius News",
        description:
            "Discover the latest buzz in your area. Geo Radius brings you trending, verified updates from real people around you.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default function page() {
    return (
        <MainContent />
    )
};
