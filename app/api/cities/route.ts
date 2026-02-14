import { NextResponse } from "next/server";

const STATE_CITIES_API = "https://countriesnow.space/api/v0.1/countries/state/cities";
const COUNTRY_CITIES_API = "https://countriesnow.space/api/v0.1/countries/cities";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country")?.trim();
  const state = searchParams.get("state")?.trim();
  if (!country) {
    return NextResponse.json({ error: "Missing country query" }, { status: 400 });
  }
  try {
    if (state) {
      const res = await fetch(STATE_CITIES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state }),
      });
      if (!res.ok) throw new Error("State cities API failed");
      const json = await res.json();
      const cities = (json.data as string[]) ?? [];
      return NextResponse.json(cities.sort((a, b) => a.localeCompare(b)));
    }
    const res = await fetch(COUNTRY_CITIES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });
    if (!res.ok) throw new Error("Cities API failed");
    const json = await res.json();
    const cities = (json.data as string[]) ?? [];
    return NextResponse.json(cities.sort((a, b) => a.localeCompare(b)));
  } catch (error) {
    console.error("[api/cities]", error);
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}
