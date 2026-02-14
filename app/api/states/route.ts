import { NextResponse } from "next/server";

const STATES_API = "https://countriesnow.space/api/v0.1/countries/states";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  if (!country?.trim()) {
    return NextResponse.json({ error: "Missing country query" }, { status: 400 });
  }
  try {
    const res = await fetch(STATES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: country.trim() }),
    });
    if (!res.ok) throw new Error("States API failed");
    const json = await res.json();
    const data = json.data;
    if (Array.isArray(data)) {
      const found = data.find(
        (c: { name: string }) => c.name?.toLowerCase() === country.trim().toLowerCase()
      );
      const states = (found?.states as Array<{ name: string }>) ?? [];
      const names = states.map((s) => s.name).filter(Boolean);
      return NextResponse.json(names.sort((a, b) => a.localeCompare(b)));
    }
    if (data?.states && Array.isArray(data.states)) {
      const names = data.states.map((s: { name: string }) => s.name).filter(Boolean);
      return NextResponse.json(names.sort((a: string, b: string) => a.localeCompare(b)));
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error("[api/states]", error);
    return NextResponse.json({ error: "Failed to fetch states" }, { status: 500 });
  }
}
