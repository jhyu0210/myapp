import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// export { default } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       if (req.nextUrl.pathname.startsWith("/admin")) {
//         return token?.role === "admin";
//       }
//       if (req.nextUrl.pathname.startsWith("/user")) {
//         return token?.role === "user";
//       }
//       return !!token;
//     },
//   },
// });
export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token?.role);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);
export const config = { matcher: ["/admin:path*", "/user:path*"] };
