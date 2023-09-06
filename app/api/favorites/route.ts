import { toggleFavorite } from "@/lib/favorites";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { favorite } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!favorite) {
      return new NextResponse("Favorite is required", { status: 400 });
    }

    await toggleFavorite(favorite);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("[FAVORITE] Error: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
