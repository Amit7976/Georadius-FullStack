import { NextResponse } from "next/server";
import { Post } from "@/src/models/postModel";
import { auth } from "@/src/auth";
import mongoose from "mongoose";
import { connectToDatabase } from "@/src/lib/utils";


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


export async function POST(req: Request) {

  // console.log("====================================");
  // console.log("======== Get Post For Edit =========");
  // console.log("====================================");

  try {
    await connectToDatabase();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const session = await auth();
    const userId = session?.user?.id;
    // const currentLoginUsername = session?.user?.username;

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const { postId } = await req.json();
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        { error: "Invalid or missing postId" },
        { status: 400 }
      );
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const postObjectId = new mongoose.Types.ObjectId(postId);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const postResult = await Post.aggregate([
      { $match: { _id: postObjectId } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          location: 1,
          longitude: 1,
          latitude: 1,
          images: 1,
          categories: 1,
          userId: 1,
        },
      },
    ]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    const post = postResult[0];
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!post.userId || post.userId.toString() !== userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
      post: post,
    });
  } catch (error) {
    console.error("❌ Error fetching single post:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}