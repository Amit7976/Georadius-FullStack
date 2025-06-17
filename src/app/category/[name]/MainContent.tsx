"use client";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BackButton from "@/src/components/BackButton";
import { PlaceholderSearchPost } from "@/src/components/home/Placeholder";
import ImageSlider from "@/src/components/ImageSlider";
import Post from "@/src/components/Post";
import { formatTimeAgo } from "@/src/helpers/formatTimeAgo";
import { t } from "@/src/helpers/i18n";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import { useGeolocation } from "../../hooks/useGeolocation";
import { PostType } from "@/src/helpers/types";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent() {
    const { name } = useParams();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [radius, setRadius] = useState("10");
    const [loading, setLoading] = useState(false);
    // const [expandedDescriptions, setExpandedDescriptions] = useState<string[]>([]);
    const location = useGeolocation();
    const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // const toggleDescription = (postId: string) => {
    //     setExpandedDescriptions((prev) =>
    //         prev.includes(postId)
    //             ? prev.filter((id) => id !== postId)
    //             : [...prev, postId]
    //     );
    // };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const fetchCategoryPosts = useCallback(async (lat: number, lng: number) => {
        const r = parseInt(radius);
        const latMin = lat - r / 111;
        const latMax = lat + r / 111;
        const lngMin = lng - r / (111 * Math.cos(lat * (Math.PI / 180)));
        const lngMax = lng + r / (111 * Math.cos(lat * (Math.PI / 180)));
        setLoading(true);

        const res = await fetch(
            `/api/post/category?category=${name}&radius=${radius}&latMin=${latMin}&latMax=${latMax}&lngMin=${lngMin}&lngMax=${lngMax}`
        );
        const data = await res.json();
        setPosts(data);
        setLoading(false);
    }, [name, radius]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        // if ("geolocation" in navigator) {
        if (!location) return;
        fetchCategoryPosts(location.lat, location.lng);
        // }
    }, [name, radius, fetchCategoryPosts]);

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


    return (
        <div className="py-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-start gap-0">
                    <BackButton classname='relative pl-1 pr-5' />
                    <h1 className="text-lg font-semibold text-gray-400 capitalize">{name}</h1>
                </div>

                <Select value={radius} onValueChange={setRadius}>
                    <SelectTrigger className="w-[120px] mr-4">
                        <SelectValue placeholder="Radius" />
                    </SelectTrigger>
                    <SelectContent className={""}>
                        <SelectItem className={""} value="5">5 km</SelectItem>
                        <SelectItem className={""} value="10">10 km</SelectItem>
                        <SelectItem className={""} value="25">25 km</SelectItem>
                        <SelectItem className={""} value="50">50 km</SelectItem>
                        <SelectItem className={""} value="500">500 km</SelectItem>
                        <SelectItem className={""} value="5000">5000 km</SelectItem>
                        <SelectItem className={""} value="50000">{t("worldwide")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <>
                    <PlaceholderSearchPost />
                </>
            ) : (
                <div className="gap-4 flex flex-col px-4">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Drawer key={index} Drawer open={openDrawerId === post._id} onOpenChange={(isOpen: boolean) => {
                                if (isOpen) handleDrawerOpen(post._id);
                                else handleDrawerClose();
                            }}>
                                <DrawerTrigger asChild>
                                    <div key={post._id} className="py-2 space-y-2 text-start active:scale-95 duration-300">
                                        <p className="text-gray-500 text-xs">{formatTimeAgo(post.updatedAt)}</p>
                                        <p className="text-xs text-gray-500 leading-5 mt-1">{post.location}</p>

                                        {Array.isArray(post.images) && post.images.length > 0 && (
                                            <div className="rounded-2xl overflow-hidden mt-4 my-2">
                                                <ImageSlider images={post.images} height={250} />
                                            </div>
                                        )}

                                        <div className="flex-6 mt-4">
                                            <h4 className="font-semibold text-lg">{post.title}</h4>
                                        </div>
                                    </div>
                                </DrawerTrigger>
                                {openDrawerId === post._id && (
                                    <Post postId={post._id} />
                                )}
                            </Drawer>
                        ))
                    ) : (
                        <div className="w-full h-screen flex items-center justify-center text-gray-400 font-medium text-lg">
                            <p>{t("noPostsInCategory")}</p>
                        </div>
                    )}
                </div>
            )
            }
        </ div>
    );
}
