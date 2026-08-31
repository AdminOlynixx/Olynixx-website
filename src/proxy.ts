import { NextRequest, NextResponse } from "next/server";

/** Password-protect hosted staging. Local dev stays open unless both env values are set. */
export function proxy(request: NextRequest) {
  const user = process.env.STAGING_USER;
  const password = process.env.STAGING_PASSWORD;
  if (!user || !password) return NextResponse.next();

  const auth = request.headers.get("authorization");
  if (auth) {
    const [, encoded] = auth.split(" ");
    const [givenUser, givenPassword] = Buffer.from(encoded || "", "base64").toString().split(":");
    if (givenUser === user && givenPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Olynixx staging"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|fonts/).*)"],
};
