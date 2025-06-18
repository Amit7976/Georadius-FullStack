"use client";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import MenuDrawer from "@/src/components/MenuDrawer";
import Post from "@/src/components/Post";
import { formatTimeAgo } from "@/src/helpers/formatTimeAgo";
import { News } from "@/src/helpers/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import PullToRefresh from "react-pull-to-refresh";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGeolocation } from "../hooks/useGeolocation";
import GetDistance from "./GetDistance";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent() {
    const [newsData, setNewsData] = useState<News[]>([]);
    const [posts, setPosts] = useState<News[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useGeolocation();
    const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const hiddenPosts = JSON.parse(localStorage.getItem("hideNews") || "[]");
        const filteredNews = posts.filter((news: News) => !hiddenPosts.includes(news._id));
        setNewsData(filteredNews);
    }, [posts]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleHide = (postId: string) => {
        setNewsData(prev => prev.filter(news => news._id !== postId));
        const hidden = JSON.parse(localStorage.getItem("hideNews") || "[]");
        if (!hidden.includes(postId)) {
            hidden.push(postId);
            localStorage.setItem("hideNews", JSON.stringify(hidden));
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!location) return;
        const fetchNearbyPosts = async (lat: number, lng: number) => {
            try {
                const res = await fetch(`/api/rapid/nearby?lat=${lat}&lng=${lng}&limit=50`);
                const json = await res.json();
                setPosts(json);
            } catch (err) {
                console.error("API fetch error:", err);
                setError("Failed to fetch nearby posts.");
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchNearbyPosts(location.lat, location.lng);
    }, [location]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleRefresh = async () => {
        window.location.reload();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const onPopState = () => {
            if (openDrawerId) {
                setOpenDrawerId(null);
            }
        };

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, [openDrawerId]);


    /////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleDrawerOpen = (postId: string) => {
        history.pushState({ drawerOpen: true }, "", window.location.href);
        setOpenDrawerId(postId);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleDrawerClose = () => {
        setOpenDrawerId(null);
        history.back();
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (loadingPosts) return <div className="flex items-center justify-center h-[94vh]"><div className="loader"></div></div>;

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (error) return <p className="text-red-500">{error}</p>;

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <PullToRefresh onRefresh={handleRefresh} resistance={5}>
            <div className="bg-gray-100 dark:bg-neutral-800">
                <Swiper direction="vertical" slidesPerView={1} className="h-[94vh] w-full">
                    {newsData.map(post => (
                        post.images.length > 0 && (
                            <SwiperSlide key={post._id} className="relative flex items-center justify-center w-full">
                                <Swiper direction="horizontal" slidesPerView={1} className="w-full h-[50vh] z-10 relative">
                                    {post.images.map(image => (
                                        <SwiperSlide key={image} className="relative flex items-center justify-center w-full">
                                            <Image loading="lazy" src={image} alt={post.title} layout="fill" sizes="full" objectFit="cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <MenuDrawer post={post} handleHide={handleHide} />

                                {/* Post Drawer */}
                                <Drawer open={openDrawerId === post._id} onOpenChange={(isOpen: boolean) => {
                                    if (isOpen) handleDrawerOpen(post._id);
                                    else handleDrawerClose();
                                }}>
                                    <DrawerTrigger asChild>
                                        <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-neutral-900 h-[50vh] px-5 pt-8 pb-16 overflow-hidden text-black dark:text-white flex flex-col justify-start z-50 pointer-events-none rounded-t-4xl border">
                                            {post.latitude && post.longitude && (
                                                <GetDistance lat={post.latitude} lng={post.longitude} />
                                            )}
                                            <h2 className="text-2xl font-bold pr-10 pointer-events-auto">{post.title}</h2>
                                            <div className="flex items-center justify-between gap-3 w-full mt-4 mb-1 pointer-events-auto">
                                                <div className="flex items-center gap-2">
                                                    <Image loading="lazy" src={post.creatorImage} alt={post.creatorName} width={40} height={40} className="rounded-full" />
                                                    <span className="text-base font-semibold">{post.creatorName}</span>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                                            </div>
                                            <div className="bg-gradient-to-b from-transparent via-white to-white dark:via-neutral-900 dark:to-neutral-900 h-[10vh] w-full absolute bottom-0"></div>
                                            <p
                                                className="text-xl text-gray-400 font-medium mt-6 cursor-pointer pointer-events-auto"
                                                dangerouslySetInnerHTML={{
                                                    __html: post.description.length === 250
                                                        ? post.description.replace(/\n/g, "<br />") + "..."
                                                        : post.description.replace(/\n/g, "<br />"),
                                                }}
                                            />

                                        </div>
                                    </DrawerTrigger>
                                    {openDrawerId === post._id && (
                                        <Post postId={post._id} />
                                    )}
                                </Drawer>
                            </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </div>
        </PullToRefresh>
    );
}
