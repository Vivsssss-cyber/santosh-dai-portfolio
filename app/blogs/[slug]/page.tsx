import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Backdrop } from "@/components/Backdrop";
import { Frame } from "@/components/Frame";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { TagList } from "@/components/Section";
import { getArt } from "@/components/blog/BlogArt";
import { posts, getPost } from "../posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Santosh Dahal`, description: post.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const art = getArt(slug);

  return (
    <>
      <Backdrop />
      <div className="shell">
        <Frame />
        <Nav />

        <article className="article">
          <a className="article-back" href="/blogs">
            ← Writing
          </a>

          <div className="post-meta article-meta">
            <span className="lcat lcat-accent">{post.category}</span>
            <span className="dot">·</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span className="dot">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="article-title">{post.title}</h1>
          <TagList items={post.tags} className="article-tags" />

          {art && (
            <figure className="cover-fig">
              <div className="article-cover">{art.cover}</div>
              <figcaption className="figcap">{art.coverCaption}</figcaption>
            </figure>
          )}

          <div className="article-body">
            {post.body.map((para, i) => (
              <Fragment key={i}>
                <p>{para}</p>
                {art && i === 0 && (
                  <figure className="figure">
                    <div className="figure-frame">{art.figure}</div>
                    <figcaption className="figcap">
                      <span className="figcap-k">Figure</span>
                      {art.figureCaption}
                    </figcaption>
                  </figure>
                )}
              </Fragment>
            ))}
          </div>

          <div className="article-foot">
            <Button href="/blogs" variant="white">
              More writing
            </Button>
            <Button href="mailto:santosh@suntos.com.np" variant="primary">
              Get in touch
            </Button>
          </div>
        </article>

        <SiteFooter />
      </div>
    </>
  );
}
