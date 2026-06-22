import type { Metadata } from "next";
import { Backdrop } from "@/components/Backdrop";
import { Frame } from "@/components/Frame";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealItem } from "@/components/Reveal";
import { MemoriesGallery } from "@/components/MemoriesGallery";

export const metadata: Metadata = {
  title: "Memories — Santosh Dahal",
  description:
    "A scrapbook from the road — robotics olympiads, hackathons, club builds and the teams behind them, before and around the speech-AI work.",
};

export default function MemoriesPage() {
  return (
    <>
      <Backdrop />
      <div className="shell">
        <Frame />
        <Nav />

        <header className="mem-head">
          <Reveal>
            <RevealItem>
              <span className="eyebrow">Memories</span>
            </RevealItem>
            <RevealItem>
              <h1 className="mem-title">
                The road, <span className="em">remembered</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mem-lead">
                Robotics olympiads, hackathons, club builds and the teams behind
                them — a scrapbook from the years before and around the speech-AI
                work.
              </p>
            </RevealItem>
          </Reveal>
        </header>

        <div className="mem-sep" aria-hidden="true" />

        <div className="mem-wrap">
          <MemoriesGallery />
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
