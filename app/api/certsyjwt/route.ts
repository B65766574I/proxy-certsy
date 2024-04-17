// app/api/certsyjwt/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    const res = await fetch(process.env.BACKEND_API + "/api/certsyjwt", {
        cache: "no-store",
    });

    const data = await res.json();
    
    const path = "/api/certsyjwt";
    revalidatePath(path);

    return NextResponse.json(data.jwt);
}

export const runtime = "edge";
