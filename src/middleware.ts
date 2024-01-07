// export { withAuth as middleware } from "next-auth/middleware";

import { NextResponse } from "next/server"

// export const config = {
//     matcher: ["/chat"]
// };

export const middleware = () => {
    return NextResponse.next()
}