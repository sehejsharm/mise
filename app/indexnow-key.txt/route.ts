export const dynamic = "force-static";

/** IndexNow key file (keyLocation). Empty until INDEXNOW_KEY is set. */
export function GET() {
  return new Response(process.env.INDEXNOW_KEY ?? "", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
