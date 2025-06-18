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

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // console.log("➡️ Fetching posts...");
    const posts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: twoDaysAgo },
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
          userId: 1,
          location: 1,
          longitude: 1,
          latitude: 1,
          images: 1,
          creatorName: 1,
          creatorImage: 1,
          upvoteCount: 1,
          downvoteCount: 1,
          share: 1,
          categories: 1,
          commentsCount: { $size: "$comments" },
          createdAt: 1,
          isUserUpvote: { $in: [userId, "$upvote"] },
          isUserDownvote: { $in: [userId, "$downvote"] },
        },
      },
      {
        $limit: 20,
      },
    ]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const finalPosts = [];

    for (const post of posts) {
      // const topComments = await Comment.aggregate([
      //   { $match: { postId: post._id } },
      //   { $sort: { createdAt: -1 } },
      //   { $limit: 10 },
      //   {
      //     $project: {
      //       _id: 1,
      //       comment: 1,
      //       username: 1,
      //       parentCommentId: 1,
      //       replyingToUsername: 1,
      //       profileImage: 1,
      //       updatedAt: 1,
      //     },
      //   },
      // ]);

      finalPosts.push({
        ...post,
        isSaved: profileData.saved.includes(post._id.toString()),
        currentUserProfile: post.userId?.toString() === userId,
        // topComments,
      });
    }

    // console.log("🔚 [END] Nearby Posts API - Returning posts");

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        message: "Posts fetched successfully",
        posts: finalPosts,
        currentLoginUsername: session?.user.username,
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
