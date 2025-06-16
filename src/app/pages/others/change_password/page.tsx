import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import MainContent from './MainContent';
import { Metadata } from "next";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export const metadata:Metadata = {
    title: "Change Password | Geo Radius News",
    description: "Update your account password to keep your information secure.",
    keywords: ["change password", "update password", "account security", "Geo Radius News"],
    alternates: {
        canonical: "https://georadiusnews.vercel.app/settings/change-password",
    },
    openGraph: {
        title: "Change Password | Geo Radius News",
        description: "Ensure account security by regularly updating your password.",
        url: "https://georadiusnews.vercel.app/settings/change-password",
        siteName: "Geo Radius News",
        images: [{
            url: "https://georadiusnews.vercel.app/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: "Change Password"
        }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Change Password | Geo Radius News",
        description: "Secure your account with a strong new password.",
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