import Link from "next/link";
import type { Metadata } from "next";
import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealItem } from "@/components/Reveal";
import { TagList } from "@/components/Section";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Writing — Santosh Dahal",
  description:
    "Field notes on speech recognition, on-device ML, and low-resource NLP — building language technology for the speakers mainstream AI ignores.",
};

export default function BlogIndex() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Backdrop />
      <div className="shell">
        <Nav />

        {/* ruled ledger — side lines bound the column, interior rule splits
            the category/meta rail from the post body (readme-style). */}
        <div className="ledger">
          <header className="blog-head">
            <Reveal>
              <RevealItem>
                <span className="eyebrow">Writing</span>
              </RevealItem>
              <RevealItem>
                <h1 className="blog-title">
                  Notes on <span className="em">speech AI</span>
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="blog-lead">
                  Field notes on speech recognition, on-device ML, and low-resource
                  NLP — building language technology for the speakers mainstream AI
                  ignores.
                </p>
              </RevealItem>
            </Reveal>
          </header>

          {/* FEATURED — latest post, full ledger width */}
          <Reveal>
            <RevealItem>
              <Link className="lfeature" href={`/blogs/${featured.slug}`}>
                <span className="lcat lcat-accent">{featured.category}</span>
                <h2 className="lfeature-title">{featured.title}</h2>
                <p className="lfeature-excerpt">{featured.excerpt}</p>
                <div className="post-meta">
                  <time dateTime={featured.date}>{featured.dateLabel}</time>
                  <span className="dot">·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <TagList items={featured.tags} />
              </Link>
            </RevealItem>
          </Reveal>

          {/* ALL POSTS — ruled rows: [category + meta rail | post body] */}
          <Reveal as="div" className="lrows">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <Link className="lrow" href={`/blogs/${p.slug}`}>
                  <div className="lmeta">
                    <span className="lcat">{p.category}</span>
                    <div className="post-meta lmeta-stack">
                      <time dateTime={p.date}>{p.dateLabel}</time>
                      <span>{p.readingTime}</span>
                    </div>
                  </div>
                  <div className="lcontent">
                    <h3 className="lrow-title">{p.title}</h3>
                    <p className="lrow-excerpt">{p.excerpt}</p>
                    <TagList items={p.tags} />
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
