"use client"

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
  Mail,
  Loader2,
  RotateCcw,
} from "lucide-react"
import { useNewsletter } from "@/hooks/use-newsletter"

const NAVY = "#1d2e86"
const ACCENT = "#3d55c5"
const TEAL = "#00D4AA"

const infoLinks = [
  {
    icon: Gavel,
    title: "How does it work?",
    body: "A Continuous Clearing Auction (CCA) where bids stay private until close. Everyone pays the same final clearing price.",
    href: "https://docs.strato.nexus",
  },
  {
    icon: FileText,
    title: "About $STRATO tokenomics",
    body: "Token supply, distribution, vesting schedules, and the role of $STRATO across the ecosystem.",
    href: "https://docs.strato.nexus",
  },
  {
    icon: Lock,
    title: "Read the STRATO litepaper",
    body: "Technical overview of the protocol, the auction mechanism, and how privacy is preserved on-chain.",
    href: "https://docs.strato.nexus",
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
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  color: ACCENT,
                  background: "rgba(61,85,197,0.1)",
                }}
              >
                <span
                  className="relative flex h-1.5 w-1.5"
                  aria-hidden
                >
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                    style={{ background: TEAL }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: TEAL }}
                  />
                </span>
                Auction
              </span>
            </div>
            <h1
              className="mb-5 max-w-[640px] text-4xl font-extrabold leading-[1.1] md:text-[56px] md:leading-[1.05]"
              style={{ color: NAVY }}
            >
              The $STRATO Public Auction
            </h1>
            <p className="mb-7 max-w-[640px] text-base leading-[1.65] text-[#5A6178] md:text-lg">
              12.5% of the <span className="font-semibold" style={{ color: NAVY }}>$STRATO</span>{" "}
              token supply will be sold in a Continuous Clearing Auction (CCA)
              on Ethereum, with bids kept private until the auction closes.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <CtaLink
                href="https://docs.strato.nexus"
                className="text-white"
                style={{ background: NAVY }}
              >
                See details <ArrowUpRight size={14} />
              </CtaLink>
              <CtaLink
                href="#updates"
                className="border border-[rgba(61,85,197,0.2)] bg-white"
                style={{ color: NAVY }}
              >
                Get notified <ArrowRight size={14} />
              </CtaLink>
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

          {/* Info link cards (mirrors zama "How does it work?" / tokenomics / litepaper) */}
          <SectionLabel>Learn more</SectionLabel>
          <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {infoLinks.map(({ icon: Icon, title, body, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[rgba(61,85,197,0.15)] bg-white p-6 shadow-[0_2px_20px_rgba(29,46,134,0.06)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(29,46,134,0.1)]"
              >
                <div className="mb-3.5 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(61,85,197,0.15)]"
                    style={{ background: "rgba(61,85,197,0.1)" }}
                  >
                    <Icon size={20} color={ACCENT} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#8B92A8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h4
                  className="mb-1.5 text-[15px] font-bold"
                  style={{ color: NAVY }}
                >
                  {title}
                </h4>
                <p className="text-[13px] leading-[1.5] text-[#5A6178]">
                  {body}
                </p>
              </a>
            ))}
          </section>

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
                  href="mailto:info@blockapps.net"
                  icon={<Mail size={14} />}
                >
                  Email us
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
