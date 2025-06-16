import { redirect } from "next/navigation";
import MainContent from "./MainContent";
import { auth } from "@/src/auth";
import type { Metadata } from "next";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata: Metadata = {
    title: "Forgot Password | Geo Radius News",
    description:
        "Reset your Geo Radius News account password securely. Enter your registered email and get back to your community updates in minutes.",
    keywords: [
        "forgot password",
        "reset password",
        "Geo Radius News password",
        "recover account",
        "password recovery",
        "secure login",
    ],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/forgot-password",
    },
    openGraph: {
        title: "Forgot Password | Geo Radius News",
        description:
            "Can’t remember your password? No worries — reset it securely and get back to hyperlocal updates.",
        url: "https://georadiusnews.vercel.app/forgot-password",
        siteName: "Geo Radius News",
        images: [
            {
                url: "https://georadiusnews.vercel.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Geo Radius News - Forgot Password",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Forgot Password | Geo Radius News",
        description:
            "Trouble signing in? Reset your password easily and continue sharing local news.",
        images: ["https://georadiusnews.vercel.app/opengraph-image.png"],
    },
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function page() {
    
    const session = await auth()
    if (session?.user) {
        redirect("/")
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <>
                <MainContent />
            </>
        </>
    );
}
