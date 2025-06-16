import { connectToDatabase } from "@/src/lib/utils";
import { UserProfile } from "@/src/models/UserProfileModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
console.log('====================================');
console.log(username);
console.log('====================================');
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const userExists = await UserProfile.exists({ username });

    return NextResponse.json({ available: !userExists }, { status: 200 });
  } catch (error) {
    console.error("❌ Error checking username:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
