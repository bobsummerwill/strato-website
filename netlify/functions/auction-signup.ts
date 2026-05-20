import type { Handler } from "@netlify/functions"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok: false }) }
  }

  let parsed: { email?: unknown; signup_source?: unknown }
  try {
    parsed = JSON.parse(event.body || "{}")
  } catch {
    return { statusCode: 400, body: JSON.stringify({ ok: false }) }
  }

  const email = typeof parsed.email === "string" ? parsed.email.trim() : ""
  if (!EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false }) }
  }

  const rawSource =
    typeof parsed.signup_source === "string" ? parsed.signup_source.trim() : ""
  const signupSource =
    rawSource && /^[a-z0-9_-]{1,64}$/i.test(rawSource) ? rawSource : "ico_waitlist"

  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID
  if (!apiKey || !publicationId) {
    console.error("auction-signup: BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID missing")
    return { statusCode: 500, body: JSON.stringify({ ok: false }) }
  }

  let res: Response
  try {
    res = await fetch(
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
          custom_fields: [{ name: "signup_source", value: signupSource }],
        }),
      },
    )
  } catch (err) {
    console.error("auction-signup: beehiiv request failed", err)
    return { statusCode: 502, body: JSON.stringify({ ok: false }) }
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    console.error(`auction-signup: beehiiv ${res.status} ${res.statusText} ${detail}`)
    return { statusCode: 502, body: JSON.stringify({ ok: false }) }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  }
}
