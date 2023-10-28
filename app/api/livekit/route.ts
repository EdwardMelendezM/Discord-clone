import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const room = searchParams.get("room")
  const username = searchParams.get("username")

  if (req.method !== "GET") {
    return new NextResponse("Invalid method", { status: 400 })
  } else if (!room) {
    return new NextResponse('Missing room query parameter', { status: 400 })
  } else if (!username) {
    return new NextResponse('Missing "username" query parameter', { status: 400 })
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return new NextResponse("Server misconfigured", { status: 500 })
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  return NextResponse.json({ token: at.toJwt() })
}
