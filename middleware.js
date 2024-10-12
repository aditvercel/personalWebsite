import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new rate limiter (e.g., 10 requests per 10 seconds)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(16, "10 s"),
  analytics: true,
});

export async function middleware(req) {
  // Use a constant string, or you can use a dynamic identifier like IP address
  const identifier = req.ip || "global_api";

  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return new NextResponse(
      JSON.stringify({ message: "Too many requests, please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Continue with the request if within the limit
  return NextResponse.next();
}

// Optional: define the paths where the middleware should apply
export const config = {
  matcher: "/api/:path*", // This applies rate limiting to all routes under /api
};
