import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from './MainContent';
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
    title: "FAQs | Geo Radius News",
    description: "Find answers to the most common questions about Geo Radius News, your account, privacy, and more.",
    keywords: ["FAQs", "help", "support", "Geo Radius News questions", "how to use"],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/help/faq",
    },
    openGraph: {
        title: "FAQs | Geo Radius News",
        description: "Explore commonly asked questions and get quick help.",
        url: "https://georadiusnews.vercel.app/help/faq",
        siteName: "Geo Radius News",
        images: [{
            url: "https://georadiusnews.vercel.app/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "Geo Radius FAQs"
        }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQs | Geo Radius News",
        description: "Get help and find answers to common questions.",
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