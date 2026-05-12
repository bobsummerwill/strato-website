"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowUpRight,
  ArrowRight,
  Lock,
  Gavel,
  FileText,
  Send,
  Twitter,
  MessageCircle,
  Loader2,
  RotateCcw,
  Check,
} from "lucide-react"
import { useNewsletter } from "@/hooks/use-newsletter"
import { LottiePlayer } from "@/components/lottie-player"

const AUCTION_SIGNUP_ENDPOINT =
  process.env.NEXT_PUBLIC_AUCTION_SIGNUP_ENDPOINT ?? ""

const ELEVATION_LOTTIE_SRC = "/lotties/elevation.lottie"

const NAVY = "#1d2e86"
const ACCENT = "#3d55c5"
const TEAL = "#00D4AA"

const infoLinks = [
  {
    icon: Lock,
    title: "Hardfi — hard assets, on-chain",
    body: "STRATO tokenizes gold, silver, and other vaulted commodities so they can move, settle, and back loans on-chain — 24/7, without a broker.",
  },
  {
    icon: FileText,
    title: "The ratio gap",
    body: "Stablecoins now sit near 1% of total US Treasury debt. Tokenized gold sits at 1–2 basis points of the global gold stock. Dollar tokenization scaled. Gold tokenization has not.",
  },
  {
    icon: Gavel,
    title: "What STRATO ships — GOLDST & SILVST",
    body: "Each backed 1:1 by audited, insured, vaulted metal. Use them as collateral, borrow against them, swap them, or redeem them for the physical bars.",
  },
]

export function AuctionPageContent() {
  return (
    <div className="relative min-h-screen bg-[#F4F5FB] flex flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-40 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(61,85,197,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[600px] -left-52 h-[450px] w-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(61,85,197,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative flex-1 mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div className="pt-4 md:pt-6 lg:pt-8">
          <Navbar />
        </div>

        <div className="mx-auto max-w-[860px] py-12 md:py-16">
          {/* Hero */}
          <section className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Public Sale
              </p>
            </div>
            <h1
              className="mb-5 max-w-[640px] text-4xl font-extrabold leading-[1.1] md:text-[56px] md:leading-[1.05]"
              style={{ color: NAVY }}
            >
              The $STRATO Public Auction
            </h1>
          </section>

          {/* Auction CTA */}
          <section
            className="relative mb-10 overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(29,46,134,0.25)]"
            style={{
              background: `linear-gradient(135deg, ${NAVY} 0%, #2D3FB0 55%, ${ACCENT} 100%)`,
            }}
          >
            {/* decorative glows */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: TEAL }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
              style={{ background: "#7B8AFF" }}
              aria-hidden
            />
            {/* subtle grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />

            <div className="relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] md:items-stretch">
              <div className="p-8 md:p-12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: TEAL }}
                    />
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ background: TEAL }}
                    />
                  </span>
                  Auction coming soon
                </div>
                <h3 className="mb-4 text-3xl font-extrabold leading-[1.1] text-white md:text-[40px]">
                  <span style={{ color: TEAL }}>2.5%</span> of $STRATO
                  <br />
                  goes public.
                </h3>
                <p className="mb-7 max-w-[440px] text-[15px] leading-[1.6] text-white/75 md:text-base">
                  Sold via a Continuous Clearing Auction (CCA) on Ethereum, with
                  bids kept private until the auction closes.
                </p>
                <div className="flex flex-col items-start gap-3">
                  <BidSignupForm />
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                    Bids private · Settled on Ethereum
                  </p>
                </div>
              </div>

              {/* Elevation lottie fills the right column (scaled up to cover) */}
              <div className="relative min-h-[280px] overflow-hidden md:min-h-0">
                <div className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2">
                  <LottiePlayer
                    src={ELEVATION_LOTTIE_SRC}
                    loop
                    autoplay
                    className="h-full w-full"
                  />
                </div>
                {/* fade the left edge so it blends into the gradient */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-24"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(29,46,134,0.6) 0%, transparent 100%)",
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </section>

          {/* Intro video */}
          <section className="mb-10">
            <div className="overflow-hidden rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white p-2 shadow-[0_2px_20px_rgba(29,46,134,0.06)]">
              <video
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                className="block h-auto w-full rounded-xl bg-black"
              >
                <source src="/videos/strato-hardfi.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          {/* Primary explainer cards */}
          <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <a
              href="https://docs.strato.nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white p-6 shadow-[0_2px_20px_rgba(29,46,134,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(29,46,134,0.12)]"
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                01 — How It Works
              </p>
              <h4
                className="mb-3 text-xl font-bold leading-[1.2]"
                style={{ color: NAVY }}
              >
                A Continuous Clearing Auction.
              </h4>
              <p className="text-[13px] leading-[1.6] text-[#5A6178]">
                Bids stay private until the auction closes. Everyone pays the
                same final clearing price — set by where supply meets demand.
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: ACCENT }}
              >
                Read in docs
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
            <a
              href="https://docs.strato.nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[rgba(61,85,197,0.15)] p-6 shadow-[0_2px_20px_rgba(29,46,134,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(29,46,134,0.25)]"
              style={{ background: NAVY }}
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: TEAL }}
              >
                02 — Tokenomics
              </p>
              <h4 className="mb-3 text-xl font-bold leading-[1.2] text-white">
                $STRATO supply &amp; distribution.
              </h4>
              <p className="text-[13px] leading-[1.6] text-[rgba(255,255,255,0.75)]">
                Token supply, allocation, vesting schedules, and the role of{" "}
                <span className="font-semibold" style={{ color: TEAL }}>
                  $STRATO
                </span>{" "}
                across the ecosystem.
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: TEAL }}
              >
                Read in docs
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
            <a
              href="https://docs.strato.nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white p-6 shadow-[0_2px_20px_rgba(29,46,134,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(29,46,134,0.12)]"
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                03 — Litepaper
              </p>
              <h4
                className="mb-3 text-xl font-bold leading-[1.2]"
                style={{ color: NAVY }}
              >
                The full technical overview.
              </h4>
              <p className="text-[13px] leading-[1.6] text-[#5A6178]">
                A walkthrough of the protocol, the auction mechanism, and how
                privacy is preserved on-chain.
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold"
                style={{ color: ACCENT }}
              >
                Read in docs
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </section>

          {/* Positioning footnotes — temporarily hidden */}
          {/*
          <SectionLabel>Why this matters</SectionLabel>
          <section className="mb-10 overflow-hidden rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white shadow-[0_2px_20px_rgba(29,46,134,0.06)]">
            {infoLinks.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={title}
                className={`flex items-center gap-5 px-5 py-5 md:px-7 md:py-6 ${
                  idx > 0 ? "border-t border-[rgba(61,85,197,0.1)]" : ""
                }`}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-[rgba(61,85,197,0.15)]"
                  style={{ background: "rgba(61,85,197,0.1)" }}
                >
                  <Icon size={18} color={ACCENT} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="mb-1 text-[15px] font-bold leading-tight"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h4>
                  <p className="text-[13px] leading-[1.5] text-[#5A6178]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </section>
          */}

          {/* Updates / newsletter */}
          <section
            id="updates"
            className="mb-9 scroll-mt-24 rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white p-7 shadow-[0_2px_20px_rgba(29,46,134,0.06)]"
          >
            <h3 className="mb-1.5 text-lg font-bold" style={{ color: NAVY }}>
              Get updates about the auction
            </h3>
            <p className="mb-5 text-sm text-[#5A6178]">
              Be the first to know when the auction opens and receive
              participation details.
            </p>

            <NewsletterForm />

            <div className="mt-6 flex flex-col gap-2.5 border-t border-[rgba(61,85,197,0.1)] pt-5 md:flex-row md:items-center md:justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8B92A8]">
                Or follow along
              </span>
              <div className="flex flex-wrap gap-2.5">
                <SocialLink
                  href="https://t.me/strato_net"
                  icon={<Send size={14} />}
                >
                  Telegram
                </SocialLink>
                <SocialLink
                  href="https://x.com/strato_net"
                  icon={<Twitter size={14} />}
                >
                  Follow on 𝕏
                </SocialLink>
                <SocialLink
                  href="https://discord.gg/cEJDGSMsg"
                  icon={<MessageCircle size={14} />}
                >
                  Discord
                </SocialLink>
              </div>
            </div>

            <p className="mt-5 text-[11px] leading-[1.55] text-[#8B92A8]">
              You may unsubscribe from these communications at any time. For
              information on how to unsubscribe, as well as our privacy
              practices and commitment to protecting your privacy, please
              review our{" "}
              <a
                href="/privacy"
                className="font-medium text-[#3d55c5] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          {/* Page footer strip */}
          <div className="flex flex-col justify-between gap-2 border-t border-[rgba(61,85,197,0.15)] pt-4 text-xs text-[#8B92A8] md:flex-row">
            <span>
              <FooterLink href="/privacy">Privacy notice</FooterLink> ·{" "}
              <FooterLink href="/terms">Terms</FooterLink> ·{" "}
              <FooterLink href="/api-terms">API terms</FooterLink>
            </span>
            <FooterLink href="https://x.com/strato_net">@strato_net</FooterLink>
          </div>
        </div>
      </div>

      <div className="relative">
        <Footer />
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  )
}

function CtaLink({
  href,
  children,
  className,
  style,
}: {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const isExternal = href.startsWith("http")
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(61,85,197,0.3)] ${className ?? ""}`}
      style={style}
    >
      {children}
    </a>
  )
}

function SocialLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const isExternal = href.startsWith("http")
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(61,85,197,0.2)] bg-white px-4 py-2 text-xs font-semibold transition-colors hover:bg-[rgba(61,85,197,0.08)]"
      style={{ color: NAVY }}
    >
      {icon}
      {children}
    </a>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith("http")
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="font-medium text-[#3d55c5] no-underline hover:underline"
    >
      {children}
    </a>
  )
}

function BidSignupForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !email.includes("@") || status === "loading") return

    setStatus("loading")

    try {
      if (!AUCTION_SIGNUP_ENDPOINT) {
        throw new Error("Signup endpoint not configured")
      }

      await fetch(AUCTION_SIGNUP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          email,
          source: "auction-page",
          submittedAt: new Date().toISOString(),
        }),
      })

      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm"
      >
        <Check size={16} style={{ color: TEAL }} />
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[440px] flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to bid"
        disabled={status === "loading"}
        aria-label="Email address"
        className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{ background: TEAL, color: NAVY }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Submitting
          </>
        ) : (
          <>
            Notify me <ArrowRight size={14} />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="mt-1 w-full text-xs font-medium text-red-200 sm:absolute sm:translate-y-12">
          Something went wrong. Try again?
        </p>
      )}
    </form>
  )
}

function NewsletterForm() {
  const { mode, email, setEmail, submit, retry, messages } = useNewsletter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    submit()
  }

  if (mode === "success") {
    return (
      <div
        className="rounded-xl border border-[rgba(0,212,170,0.25)] px-4 py-3 text-sm font-medium"
        style={{
          background: "rgba(0,212,170,0.08)",
          color: NAVY,
        }}
      >
        {messages.success}
      </div>
    )
  }

  if (mode === "error") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-red-700">
          {messages.error}
        </span>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
        >
          <RotateCcw size={12} />
          Try again
        </button>
      </div>
    )
  }

  const isLoading = mode === "loading"

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={messages.placeholder}
        disabled={isLoading}
        className="flex-1 rounded-full border border-[rgba(61,85,197,0.2)] bg-white px-5 py-2.5 text-sm placeholder:text-[#8B92A8] focus:border-[#3d55c5] focus:outline-none focus:ring-2 focus:ring-[rgba(61,85,197,0.2)] disabled:opacity-60"
        style={{ color: NAVY }}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(61,85,197,0.3)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
        style={{ background: ACCENT }}
      >
        {isLoading ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Subscribing
          </>
        ) : (
          <>
            Subscribe <ArrowRight size={14} />
          </>
        )}
      </button>
    </form>
  )
}
