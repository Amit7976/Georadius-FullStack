import type { Metadata } from "next";
import MainContent from "./MainContent";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


type Props = {
    params: Promise<{ name: string }>;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export async function generateMetadata(props: Props): Promise<Metadata> {
    const rawCategory = await props.params || "Category";
    const decoded = decodeURIComponent(rawCategory.name).trim();
    const formatted = decoded.charAt(0).toUpperCase() + decoded.slice(1);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return {
        title: `${formatted} | Geo Radius News`,
        description: `Get the latest "${formatted}" updates powered by your local community. Stay informed with Geo Radius News.`,
        keywords: [
            `${formatted} news`,
            `${formatted} local updates`,
            `${formatted} geo news`,
            `hyperlocal ${formatted}`,
            "community-powered news",
            "Geo Radius News",
        ],
        alternates: {
            canonical: `https://georadiusnews.vercel.app/category/${encodeURIComponent(rawCategory.name)}`,
        },
        openGraph: {
            title: `${formatted} — Geo Radius News`,
            description: `Get the latest verified "${formatted}" stories from your neighborhood.`,
            url: `https://georadiusnews.vercel.app/category/${encodeURIComponent(rawCategory.name)}`,
            siteName: "Geo Radius News",
            images: [
                {
                    url: "https://georadiusnews.vercel.app/opengraph-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Geo Radius News",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${formatted} — Geo Radius News`,
            description: `Real-time HyperLocal news in "${formatted}". Verified and shared by the community.`,
            images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
        },
    };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default function page() {
    return (
       <MainContent/>
   )
}
