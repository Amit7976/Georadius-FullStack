import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from './MainContent';
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
    title: "Privacy & Security Center | Geo Radius News",
    description: "Manage your privacy settings, learn about our policies, and delete your account securely.",
    keywords: ["privacy", "security", "account deletion", "Geo Radius policies", "data control", "user safety"],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/settings/privacy-security",
    },
    openGraph: {
        title: "Privacy & Security Center | Geo Radius News",
        description: "Take control of your data and privacy with detailed settings and policies.",
        url: "https://georadiusnews.vercel.app/settings/privacy-security",
        siteName: "Geo Radius News",
        images: [{
            url: "https://georadiusnews.vercel.app/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "Privacy and Security"
        }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy & Security Center | Geo Radius News",
        description: "Understand our policies and manage your data securely.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    }
};
  
/////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {

    const session = await auth();
    if (!session?.user) redirect("/pages/auth/signin");

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <MainContent />
        </>
    );
}