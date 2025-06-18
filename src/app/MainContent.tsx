"use client";
import { useGeolocation } from "@/src/app/hooks/useGeolocation";
import { t } from "@/src/helpers/i18n";
import { News } from "@/src/helpers/types";
import { useEffect, useRef, useState } from "react";
import CategoryTabs from "../components/home/CategoryTabs";
import HeaderFilter from "../components/home/HeaderFilter";
import LocationDeniedBanner from "../components/home/locationDenied";
import TrendingNewsSlider from "../components/TrendingNewsSlider";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent() {
    const [selectedFilter, setSelectedFilter] = useState(t("nearby"));
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [newsData, setNewsData] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const [currentLoginUsername, setCurrentLoginUsername] = useState("");
    const location = useGeolocation();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (error) {
            alert(error);
            setError(null);
        }
    }, [error]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleHide = (postId: string) => {
        setNewsData(prevNews => prevNews.filter(news => news._id !== postId.toString()));

        const hiddenPosts = JSON.parse(localStorage.getItem("hideNews") || "[]");
        if (!hiddenPosts.includes(postId)) {
            hiddenPosts.push(postId);
            localStorage.setItem("hideNews", JSON.stringify(hiddenPosts));
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!location) return;

        /////////////////////////////////////////////////////////////////////////////////////////////////////

        const range = selectedFilter === "Nearby"
            ? Number(localStorage.getItem("radius")) || 10
            : selectedFilter === "District"
                ? 100
                : 7000;

        /////////////////////////////////////////////////////////////////////////////////////////////////////

        const fetchNearbyPosts = async (latitude: number, longitude: number) => {
            setLoading(true);
            try {
                const hiddenPosts: string[] = JSON.parse(localStorage.getItem("hideNews") || "[]");

                const res = await fetch(`/api/main/category`, {
                    method: "POST", // Changed to POST
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        hiddenPostIds: hiddenPosts,
                        category: selectedCategory,
                        lat: latitude,
                        lng: longitude,
                        range: range,
                        limit: 50,
                    }),
                });

                /////////////////////////////////////////////////////////////////////////////////////////////////////

                const json = await res.json();
                setCurrentLoginUsername(json.currentLoginUsername);
                // console.log('/////////////////////////////////////////////////////');
                // console.log(json);
                // console.log('/////////////////////////////////////////////////////');
                // console.log(json.posts);
                // console.log('/////////////////////////////////////////////////////');

                /////////////////////////////////////////////////////////////////////////////////////////////////////

                // Remove hidden posts
                const filteredNews: News[] = json.posts.filter((news: News) => !hiddenPosts.includes(news._id));

                // console.log('====================================');
                // console.log(filteredNews);
                // console.log('====================================');

                /////////////////////////////////////////////////////////////////////////////////////////////////////

                setNewsData(filteredNews);

            } catch (err) {
                console.error("API fetch error:", err);
                setError("Failed to fetch nearby posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchNearbyPosts(location.lat, location.lng);
    }, [selectedFilter, selectedCategory]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setMounted(true), 10); // tiny delay to trigger animation
            return () => clearTimeout(timer);
        } else {
            setMounted(false); // reset animation when reloading
        }
    }, [loading]);

    return (
        <div className="h-screen w-full p-0 scroll-smooth">

            {/* Header Filter */}
            <HeaderFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

            {/* Location Banner */}
            <LocationDeniedBanner />


            {/* Trending News */}
            <TrendingNewsSlider/>

            {/* Categories News */}
            <CategoryTabs selectedCategory={selectedCategory} mounted={mounted} setSelectedCategory={setSelectedCategory} currentLoginUsername={currentLoginUsername} handleHide={handleHide} loading={loading} newsData={newsData} categoriesRef={categoriesRef} />

        </div>
    );
}
