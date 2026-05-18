import type { Metadata } from "next"
import { AuctionPageContent } from "@/components/auction-page-content"

export const metadata: Metadata = {
  title: "The $STRATO Public Auction",
  description:
    "2.5% of the $STRATO token supply will be sold in a Continuous Clearing Auction (CCA) on Ethereum, with bids kept private until the auction closes.",
  alternates: {
    canonical: "/auction",
  },
}

export default function AuctionPage() {
  return <AuctionPageContent />
}
