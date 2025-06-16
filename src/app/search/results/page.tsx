import { auth } from '@/src/auth';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SearchResultsClient from './SearchResultsClient';


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

    
type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

export async function generateMetadata(
    { searchParams }: Props,
): Promise<Metadata> {
    const { q } = await searchParams
    const query = q as string || 'Default Search';
    const decodedQuery = decodeURIComponent(query).trim();
    const formatted = decodedQuery.charAt(0).toUpperCase() + decodedQuery.slice(1);


    return {
        title: `${formatted} — Geo Radius News`,
        description: `Explore HyperLocal news updates for "${formatted}". Discover verified stories shared by your local community in real-time.`,
        keywords: [
            `${formatted} local news`,
            `news near me about ${formatted}`,
            `geo news ${formatted}`,
            "hyperlocal search results",
            "location-based news",
            "Geo Radius News",
        ],
        alternates: {
            canonical: `https://georadiusnews.vercel.app/search/results?q=${encodeURIComponent(decodedQuery)}`,
        },
        openGraph: {
            title: `Search: "${formatted}" — Geo Radius News`,
            description: `Find live local updates for "${formatted}" shared and verified by your neighborhood.`,
            url: `https://georadiusnews.vercel.app/search/results?q=${encodeURIComponent(decodedQuery)}`,
            siteName: 'Geo Radius News',
            images: [
                {
                    url: 'https://georadiusnews.vercel.app/opengraph-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Geo Radius News Search',
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Search: "${formatted}" — Geo Radius News`,
            description: `Get real-time local news updates related to "${formatted}".`,
            images: ['https://georadiusnews.vercel.app/opengraph-image.png'],
        },
    };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function Page() {
    const cookieStore = await cookies();
    const LPS = cookieStore.get("LPS")?.value;
    if (!LPS) redirect("/pages/onboarding/permissions/location");

    const session = await auth();
    if (!session?.user) redirect("/pages/auth/signin");

    return <SearchResultsClient />;
}
