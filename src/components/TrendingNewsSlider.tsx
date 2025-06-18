"use client";
import { LoaderLink } from "@/src/components/loaderLinks";
import { formatTimeAgo } from "@/src/helpers/formatTimeAgo";
import { t } from "@/src/helpers/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
// import { News, TrendingNewsPost } from '../helpers/types';
import Post from "./Post";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import { useGeolocation } from "../app/hooks/useGeolocation";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

type Breaking = {
    _id: string,
    title: string,
    longitude: number,
    latitude: number,
    image: string,
    creatorName: string,
    createdAt: string,
}

const TrendingNewsSlider = () => {
    const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
    const [data, setData] = useState<Breaking[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchBreakingPosts = async () => {
            setLoading(true);
            try {
                const hiddenPosts: string[] = JSON.parse(localStorage.getItem("hideNews") || "[]");

                const res = await fetch(`/api/main/breaking`);
                const data = await res.json();
                if (data?.posts) {
                    const filteredNews: Breaking[] = data.posts.filter((news: Breaking) => !hiddenPosts.includes(news._id));
                    setData(filteredNews);
                }
            } catch (err) {
                console.error("API fetch error:", err);
                setError(t("failedToFetchNearbyPosts"));
            } finally {
                setLoading(false);
            }
        };
        fetchBreakingPosts();
    }, []);


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

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    /////////////////////////////////////////////////////////////////////////////////////////////////////


    if (loading) return (
        <div className='py-3 px-0'>
            <HeaderForTrendingNews />
            <div className="py-2 pr-0">
                <Swiper spaceBetween={0} slidesPerView={1} parallax={true} modules={[Autoplay]}>
                    {[1, 2, 3].map((i) => (
                        <SwiperSlide key={i}>
                            <div className="animate-pulse bg-gray-100 dark:bg-neutral-800 rounded-lg h-80 w-full" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );

    return (
        <>
            <div className="py-3 px-0">
                <HeaderForTrendingNews />
                <div className="py-2 pr-0">
                    <Swiper spaceBetween={0} slidesPerView={1} parallax={true} modules={[Autoplay]}>
                        {data.map((news, index: number) => (
                            <SwiperSlide key={news._id || index}>
                                {/* Post Drawer */}
                                <Drawer open={openDrawerId === news._id} onOpenChange={(isOpen: boolean) => {
                                    if (isOpen) handleDrawerOpen(news._id);
                                    else handleDrawerClose();
                                }}>
                                    <DrawerTrigger asChild>
                                        <div className="w-full h-80 relative overflow-hidden text-start select-none bg-gray-100 dark:bg-neutral-800 active:scale-95 duration-300">
                                            <Image loading="lazy"
                                                src={news.image || '/default-image.jpg'}
                                                alt={news.creatorName || ""}
                                                width={600}
                                                height={300}
                                                className="w-full h-full object-cover object-center"
                                            />
                                            {/* Text Overlay */}
                                            <div className="absolute bottom-0 space-y-3 py-4 w-full h-full bg-gradient-to-b to-[#00000090] px-3 flex flex-col justify-end text-white z-50">
                                                <span className="text-xl font-bold">{news.title}</span>
                                                <div className="flex items-center gap-4 flex-wrap">
                                                    <p className="font-bold text-gray-100 text-sm">
                                                        <span className='text-gray-300 font-normal'>by</span> {news?.creatorName || "Unknown"}
                                                    </p>
                                                    <p className="text-gray-400 text-xs font-medium">
                                                        {news.createdAt ? formatTimeAgo(news.createdAt) : "Just now"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </DrawerTrigger>
                                    {/* {openDrawerId === news._id && ( */}
                                    <Post postId={news._id} />
                                    {/* )} */}
                                </Drawer>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>

    );
};
export default TrendingNewsSlider;

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const HeaderForTrendingNews = () => {
    return (
        <div className="flex justify-between items-end p-2">
            <h2 className="text-3xl font-bold">{t("breaking")} <span className='text-green-500'>{t("news")}</span></h2>
            <LoaderLink href={'/pages/trendingNews'} className="text-xs font-bold pb-2 text-gray-500 active:scale-95">
                {t("viewAll")}
            </LoaderLink>
        </div>
    )
}