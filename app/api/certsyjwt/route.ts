// app/api/certsyjwt/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const res = await fetch(
      process.env.BACKEND_API + "/api/certsyjwt",
      {cache: 'no-store'});
    // const ress = await fetch("http://localhost:8000/api/certsyjwt");
    const data = await res.json();
    return NextResponse.json(data.jwt);
}
