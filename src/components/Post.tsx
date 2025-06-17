"use client";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Comments from "@/src/components/Comments";
import SaveButton from "@/src/components/saveButton";
import ShareButton from "@/src/components/ShareButton";
import VoteButtons from "@/src/components/VoteButtons";
import { formatTimeAgo } from "@/src/helpers/formatTimeAgo";
import { t } from "@/src/helpers/i18n";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import GetDistance from "../app/rapid/GetDistance";
import { CommentType, News } from "../helpers/types";

function Post({ postId }: { postId: string }) {
    const [newsData, setNewsData] = useState<News[]>([]);
    const [currentLoginUsername, setCurrentLoginUsername] = useState("");
    const [comments, setComments] = useState<CommentType[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPost = async () => {

            try {
                setLoading(true);
                const res = await fetch("/api/post/getSinglePost", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postId })
                });

                const data = await res.json();
                if (data?.post) {
                    const post: News = data.post;
                    const username = data.currentLoginUsername;

                    setNewsData([post]);
                    setCurrentLoginUsername(username);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [postId]);


    
    if (loading) return <div className="flex items-center justify-center h-[94vh]"><div className="loader"></div></div>;

    return (
        <>
            {newsData.map((post) => (
                <DrawerContent key={postId} className="p-0 pointer-events-auto bg-white dark:bg-neutral-900 rounded-none h-screen data-[vaul-drawer-direction=bottom]:max-h-[90vh] duration-1000">
                    <div className="overflow-y-scroll pb-10">
                        <div className="bg-white dark:bg-neutral-900 h-10 w-full sticky top-0"></div>

                        <div className="flex items-center justify-between gap-10 px-4">
                            <span className="text-sm font-semibold text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                            <div className="scale-125"><SaveButton news={post} /></div>
                        </div>

                        <DrawerTitle className="pt-4 text-2xl font-bold pl-4 pr-10 capitalize">{post.title}</DrawerTitle>

                        <Swiper direction="horizontal" slidesPerView={1} className="w-full h-[400px] z-10 relative my-5">
                            {post.images.map(image => (
                                <SwiperSlide key={image} className="relative flex items-center justify-center w-full">
                                    <Image loading="lazy" src={image} alt={post.title} layout="fill" sizes="full" objectFit="cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="mt-8 px-4">
                            {post.latitude && post.longitude && (
                                <GetDistance lat={post.latitude} lng={post.longitude} location={post.location} />
                            )}
                        </div>

                        <p
                            className="text-xl text-gray-400 font-medium my-10 cursor-pointer text-balance px-4"
                            dangerouslySetInnerHTML={{
                                __html: post.description.replace(/\n/g, "<br />"),
                            }}
                        />

                        <div className="flex items-center justify-between gap-8 w-full mt-6 mb-1 px-4">
                            <div className="flex items-center gap-2">
                                <Image loading="lazy" src={post.creatorImage} alt={post.creatorName} width={40} height={40} className="rounded-full" />
                                <span className="text-base font-semibold">{post.creatorName}</span>
                            </div>
                            <div className="flex justify-between items-center px-6">
                                <div className="flex justify-between items-center gap-5 scale-110">
                                    <VoteButtons news={post} />
                                    <ShareButton shareProps={post} />
                                </div>
                            </div>
                        </div>

                        {/* Comment Drawer */}
                        <div className={"pt-10 px-5"}>
                            <Drawer>
                                <DrawerTrigger className="flex items-center justify-center gap-1 bg-gray-200 dark:bg-neutral-800 w-full p-4 text-center rounded-2xl">
                                    <MessageCircle className="size-5 text-black dark:text-white" />
                                    <span className="font-semibold text-base text-black dark:text-white">Comments</span>
                                </DrawerTrigger>
                                <DrawerContent className={"bg-white dark:bg-neutral-900 p-4 h-screen data-[vaul-drawer-direction=bottom]:max-h-[90vh]"}>
                                    <DrawerHeader className="p-4 overflow-scroll">
                                        <DrawerTitle className="text-lg font-semibold mt-0 mb-5 text-start">{t("comments")}</DrawerTitle>
                                        <Comments
                                            news_id={post._id}
                                            currentLoginUsername={currentLoginUsername}
                                            comments={comments}
                                            setComments={setComments}
                                            hasMore={hasMore}
                                            setHasMore={setHasMore}
                                            totalComments={post.commentsCount}
                                        />
                                    </DrawerHeader>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </DrawerContent>
            ))}
        </>
    );
}

export default Post;
