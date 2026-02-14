import { NextResponse } from "next/server";

const COUNTRIES_API = "https://countriesnow.space/api/v0.1/countries";

export async function GET() {
  try {
    const res = await fetch(COUNTRIES_API);
    if (!res.ok) throw new Error("Countries API failed");
    const json = await res.json();
    const list = (json.data as Array<{ country: string }>) ?? [];
    const countries = list.map((c) => c.country).filter(Boolean);
    return NextResponse.json(countries.sort((a, b) => a.localeCompare(b)));
  } catch (error) {
    console.error("[api/countries]", error);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}
