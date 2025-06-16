import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import ProfileClientContent from "./ProfileClientContent";
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: "Your Profile | Geo Radius News",
    description: "View and manage your profile, bio, interests, and public activity. Customize how others see you on Geo Radius News.",
    keywords: [
        "profile",
        "user profile",
        "Geo Radius News account",
        "edit profile",
        "user details",
        "personal info"
    ],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/profile",
    },
    openGraph: {
        title: "Your Profile | Geo Radius News",
        description: "Customize your public appearance, update your bio, and manage personal information on Geo Radius News.",
        url: "https://georadiusnews.vercel.app/profile",
        siteName: "Geo Radius News",
        images: [
            {
                url: "https://georadiusnews.vercel.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Geo Radius News Profile Page",
            },
        ],
        locale: "en_US",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Profile | Geo Radius News",
        description: "Control what others see on your public profile and personalize your identity.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page({ params }: { params: Promise<{ profile: string }> }) {

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const { profile } = await params;

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const session = await auth();
    if (!session?.user) redirect("/pages/auth/signin");

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <ProfileClientContent profile={profile} />
        </>
    );
}