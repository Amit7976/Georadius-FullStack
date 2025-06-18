"use client";
import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DeleteButton from "@/src/components/DeleteButton";
import HideButton from "@/src/components/HideButton";
import { LoaderLink } from "@/src/components/loaderLinks";
import QrButton from "@/src/components/QrButton";
import { t } from "@/src/helpers/i18n";
import { News } from "@/src/helpers/types";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import "swiper/css";


function MenuDrawer({ post, handleHide }: { post: News, handleHide: (postId: string) => void; }) {
  return (
      <>
          {/* Menu Drawer */}
          <div className="absolute top-5 right-4 z-50">
              <Drawer>
                  <DrawerTrigger>
                      <HiDotsVertical className="text-2xl text-gray-500" />
                  </DrawerTrigger>
                  <DrawerContent className={""}>
                      <div className="px-4 py-10 space-y-6">
                          <DialogTitle className="flex gap-2 px-4 flex-wrap">
                              {post.categories.map((cat, idx) => (
                                  <LoaderLink key={idx} href={`/category/${cat}`} className="bg-gray-200 dark:bg-neutral-800 rounded-sm px-5 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-green-500 cursor-pointer">
                                      {cat}
                                  </LoaderLink>
                              ))}
                          </DialogTitle>

                          <div className="space-y-2">
                              <HideButton postId={post._id} onHide={() => handleHide(post._id)} />
                              <QrButton postId={post._id} />
                              {post.currentUserProfile ? (
                                  <>
                                      <LoaderLink href={`/pages/edit_post/${post._id}`} className="flex gap-3 w-full p-3 text-lg justify-start cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 border-2 rounded-lg bg-gray-100 dark:bg-neutral-800">
                                          <Pencil /> {t("edit")}
                                      </LoaderLink>
                                      <DeleteButton postId={post._id} onHide={() => handleHide(post._id)} />
                                  </>
                              ) : (
                                  <>
                                      <LoaderLink href={`/${post.creatorName}`} className="flex gap-3 w-full p-3 text-lg justify-start cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 border-2 rounded-lg bg-gray-100 dark:bg-neutral-800">
                                          <Image loading="lazy" src={post.creatorImage} alt="Profile" width={40} height={40} className="rounded-full size-5" /> {t("viewProfile")}
                                      </LoaderLink>
                                      <LoaderLink href={`/pages/others/report_an_issue/${post._id}`} className="flex gap-3 w-full p-3 text-lg justify-start cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 border-2 rounded-lg bg-gray-100 dark:bg-neutral-800">
                                          <TbReport className="size-6" /> {t("report")}
                                      </LoaderLink>
                                  </>
                              )}
                          </div>
                      </div>
                  </DrawerContent>
              </Drawer>
          </div>
      </>
  )
}

export default MenuDrawer