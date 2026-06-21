import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { TagList } from "@/components/Section";
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

  return (
    <>
      <Backdrop />
      <div className="shell">
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

          <div className="article-body">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
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
