import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseAdmin = url && serviceKey ? createClient(url, serviceKey) : null;

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, error: "No Supabase credentials" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const {
      session_id,
      visitor_id,
      path,
      referrer,
      device_type,
      browser,
      os,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    if (!session_id || !visitor_id) {
      return NextResponse.json({ ok: false, error: "Missing ids" }, { status: 400 });
    }

    // Extract Vercel Geolocation headers for live map & location analytics
    const country = request.headers.get("x-vercel-ip-country") || null;
    const rawCity = request.headers.get("x-vercel-ip-city");
    const city = rawCity ? decodeURIComponent(rawCity) : null;
    const rawLat = request.headers.get("x-vercel-ip-latitude");
    const rawLng = request.headers.get("x-vercel-ip-longitude");
    const latitude = rawLat ? Math.round(parseFloat(rawLat) * 10) / 10 : null;
    const longitude = rawLng ? Math.round(parseFloat(rawLng) * 10) / 10 : null;

    const { error } = await supabaseAdmin.from("storefront_events").insert({
      session_id,
      visitor_id,
      path: path || "/",
      referrer: referrer || null,
      country,
      city,
      latitude,
      longitude,
      device_type: device_type || "desktop",
      browser: browser || "Browser",
      os: os || "OS",
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Track insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
