import { NextResponse } from "next/server"

export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: { email?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const email = typeof body.email === "string" ? body.email.trim() : ""
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID
  if (!apiKey || !publicationId) {
    console.error("auction-signup: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID missing")
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const beehiivRes = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: "ico_landing",
        utm_medium: "website",
        utm_campaign: "strato_ico_waitlist",
        custom_fields: [{ name: "signup_source", value: "ico_waitlist" }],
      }),
    },
  )

  if (!beehiivRes.ok) {
    const detail = await beehiivRes.text().catch(() => "")
    console.error(
      `auction-signup: beehiiv ${beehiivRes.status} ${beehiivRes.statusText} ${detail}`,
    )
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
