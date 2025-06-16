"use client";
import NewsPost from '@/src/components/NewsPost';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { t } from '@/src/helpers/i18n';
import BackButton from '@/src/components/BackButton';
import { News } from '@/src/helpers/types';
import { PlaceholderPost } from '@/src/components/home/Placeholder';
import type { Metadata } from "next";


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

function Page() {
    const [data, setData] = useState<News[]>([]);
    const [currentLoginUsername, setCurrentLoginUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const location = useGeolocation();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchNearbyPosts = async (latitude: number, longitude: number) => {
            setLoading(true);
            try {
                const hiddenPosts: string[] = JSON.parse(localStorage.getItem("hideNews") || "[]");

                const res = await fetch(`/api/main/nearby?lat=${latitude}&lng=${longitude}&range=7000&limit=20&images=0`);
                const data = await res.json();
                if (data?.posts) {
                    const filteredNews: News[] = data.posts.filter((news: News) => !hiddenPosts.includes(news._id));
                    setData(filteredNews);
                    setCurrentLoginUsername(data.currentLoginUsername);
                }
            } catch (err) {
                console.error("API fetch error:", err);
                setError(t("failedToFetchNearbyPosts"));
            } finally {
                setLoading(false);
            }
        };

        fetchNearbyPosts(location.lat, location.lng);
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (loading) return (
        <div className='py-3'>
            <div className='flex justify-start items-center gap-0'>
                <BackButton classname='relative text-sm pl-0 pr-5' />
                <h2 className="text-xl font-bold">{t("breaking")} <span className='text-green-500'>{t("news")}</span></h2>
            </div>
            <div className="py-6 px-1">
                <PlaceholderPost />
            </div>
        </div>
    );

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!data || data.length === 0) return (
        <>
            <div className="h-screen w-full flex items-center justify-center">
                <p className='text-xl font-medium text-gray-500'>{t("noBreakingNewsNearByYou")}</p>
            </div>
        </>
    );

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleHide = (postId: string) => {
        setData(prevNews => prevNews.filter(news => news._id !== postId.toString()));

        const hiddenPosts = JSON.parse(localStorage.getItem("hideNews") || "[]");
        if (!hiddenPosts.includes(postId)) {
            hiddenPosts.push(postId);
            localStorage.setItem("hideNews", JSON.stringify(hiddenPosts));
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='py-3'>
            <div className='flex justify-start items-center gap-0'>
                <BackButton classname='relative text-sm pl-0 pr-5' />
                <h2 className="text-xl font-bold">{t("breaking")} <span className='text-green-500'>{t("news")}</span></h2>
            </div>
            <div className="py-6 px-1">
                {data.map((news) => (
                    <NewsPost news={news} key={news._id} onHide={handleHide} fullDescription={false} currentLoginUsername={currentLoginUsername} />
                ))}
            </div>
        </div>
    );
}

export default Page;
