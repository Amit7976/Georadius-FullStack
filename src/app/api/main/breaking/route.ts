import { auth } from "@/src/auth";
import { connectToDatabase } from "@/src/lib/utils";
// import { Comment } from "@/src/models/commentModel";
import { Post } from "@/src/models/postModel";
import { UserProfile } from "@/src/models/UserProfileModel";
import { NextResponse } from "next/server";

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

export const dynamic = "force-dynamic";

/////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GET() {
  // console.log("====================================");
  // console.log("========= Nearby Posts API =========");
  // console.log("====================================");

  // console.log("📌 [START] Nearby Posts API");

  try {
    // console.log("➡️ Connecting to DB...");
    await connectToDatabase();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const session = await auth();
    const userId = session?.user?.id;
    // console.log("🔐 Authenticated User ID:", userId);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // const { searchParams } = new URL(req.url);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    interface ProfileData {
      saved: string[];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get user profile (excluding username from DB, we’ll inject it manually)
    const profileData = (await UserProfile.findOne(
      { userId: userId },
      {
        saved: 1,
      }
    ).lean()) as ProfileData | null;

    if (!profileData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // console.log("➡️ Fetching posts...");
    // Date 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // Fetch posts from last 2 days
    const recentPosts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: twoDaysAgo },
          $expr: {
            $gt: [{ $size: "$images" }, 0],
          },
        },
      },
      {
        $addFields: {
          upvoteCount: { $size: "$upvote" },
          downvoteCount: { $size: "$downvote" },
          voteScore: {
            $subtract: [{ $size: "$upvote" }, { $size: "$downvote" }],
          },
        },
      },
      {
        $sort: {
          voteScore: -1,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: { $arrayElemAt: ["$images", 0] },
          creatorName: 1,
          createdAt: 1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // If less than 5, fill with older posts
    let posts = [...recentPosts];

    if (recentPosts.length < 5) {
      const olderPosts = await Post.aggregate([
        {
          $match: {
            createdAt: { $lt: twoDaysAgo },
            $expr: {
              $gt: [{ $size: "$images" }, 0],
            },
          },
        },
        {
          $addFields: {
            upvoteCount: { $size: "$upvote" },
            downvoteCount: { $size: "$downvote" },
            voteScore: {
              $subtract: [{ $size: "$upvote" }, { $size: "$downvote" }],
            },
          },
        },
        {
          $sort: {
            voteScore: -1,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            image: { $arrayElemAt: ["$images", 0] },
            creatorName: 1,
            createdAt: 1,
          },
        },
        {
          $limit: 5 - recentPosts.length,
        },
      ]);

      posts = [...posts, ...olderPosts];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        message: "Posts fetched successfully",
        posts: posts,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Nearby Posts API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
