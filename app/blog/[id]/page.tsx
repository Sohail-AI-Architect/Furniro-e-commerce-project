import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostMeta } from "@/components/blog-post-meta";
import { Features } from "@/components/features";
import { SearchIcon } from "@/components/icons";
import { PageBanner } from "@/components/page-banner";
import {
  blogCategories,
  blogPosts,
  getBlogPost,
  recentBlogPosts,
} from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);

  return {
    title: post ? `${post.title} - Furniro` : "Blog - Furniro",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((item) => item.slug === id);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <>
      <PageBanner
        title="Blog"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Article" },
        ]}
        image={post.image}
        headingLevel="h2"
      />

      <section className="w-full pb-12 pt-12 lg:pb-[58px] lg:pt-[80px]">
        <div className="container-page">
          <div className="grid gap-12 xl:grid-cols-[817px_393px] xl:items-start xl:gap-[30px]">
            <article className="mx-auto w-full max-w-[817px] xl:mx-0">
              <div className="relative aspect-[817/500] w-full overflow-hidden rounded-[10px] bg-mist">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1279px) 100vw, 817px"
                  className="object-cover"
                />
              </div>

              <BlogPostMeta
                date={post.date}
                dateTime={post.dateTime}
                category={post.category}
                className="mt-7"
              />

              <h1 className="mt-5 text-[32px] font-medium leading-[1.25] text-black sm:text-[40px] sm:leading-[1.3]">
                {post.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-light">
                {post.excerpt}
              </p>

              <div className="mt-8 space-y-6 text-base leading-8 text-muted-light">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="mt-9 border-l-4 border-gold bg-[#F9F1E7] px-6 py-5 text-xl font-medium leading-8 text-black">
                &ldquo;{post.quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-muted-light">
                <p>
                  Category:{" "}
                  <span className="font-medium text-black">{post.category}</span>
                </p>
                <p>{post.readingTime}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 border-b border-black pb-1 text-base text-black transition-colors hover:border-gold hover:text-gold"
                >
                  <span aria-hidden="true">&larr;</span>
                  Back to blog
                </Link>

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="text-right text-sm text-muted-light transition-colors hover:text-gold"
                  >
                    Next story
                    <span className="mt-1 block max-w-[320px] text-base font-medium text-black">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : null}
              </div>
            </article>

            <aside className="mx-auto w-full max-w-[393px] space-y-10 xl:mx-0 xl:-mt-[22px] xl:space-y-[41px]">
              <div className="bg-white pb-[61px] pt-[22px]">
                <form
                  action="/blog"
                  role="search"
                  className="mx-auto flex h-[58px] w-[calc(100%-82px)] max-w-[311px] items-center rounded-[10px] bg-white pl-4 pr-[10px]"
                >
                  <label htmlFor="blog-detail-search" className="sr-only">
                    Search the blog
                  </label>
                  <input
                    id="blog-detail-search"
                    name="q"
                    type="search"
                    className="min-w-0 flex-1 bg-transparent text-base text-black outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-6 w-6 shrink-0 items-center justify-center text-black transition-colors hover:text-gold"
                  >
                    <SearchIcon className="h-6 w-6" />
                  </button>
                </form>

                <div className="ml-[77px] mr-[65px] mt-[43px]">
                  <h2 className="text-2xl font-medium leading-9 text-black">
                    Categories
                  </h2>
                  <ul className="mt-[33px] space-y-[41px]">
                    {blogCategories.map((category) => (
                      <li key={category.label}>
                        <Link
                          href={`/blog?q=${encodeURIComponent(category.label)}`}
                          className="flex items-center justify-between text-base leading-6 text-muted-light transition-colors hover:text-gold"
                        >
                          <span>{category.label}</span>
                          <span>{category.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white px-5 pb-4 pt-4 sm:pl-[76px] sm:pr-[65px]">
                <h2 className="text-2xl font-medium leading-9 text-black">
                  Recent Posts
                </h2>
                <ul className="mt-[26px] space-y-[39px]">
                  {recentBlogPosts.map((recent) => (
                    <li key={recent.title} className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[#D9D9D9]">
                        <Image
                          src={recent.image}
                          alt={recent.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 pt-2">
                        {recent.slug ? (
                          <Link
                            href={`/blog/${recent.slug}`}
                            className="line-clamp-2 block min-h-[42px] text-sm leading-[21px] text-black transition-colors hover:text-gold"
                          >
                            {recent.title}
                          </Link>
                        ) : (
                          <p className="line-clamp-2 min-h-[42px] text-sm leading-[21px] text-black">
                            {recent.title}
                          </p>
                        )}
                        <p className="mt-[5px] text-xs leading-[18px] text-muted-light">
                          {recent.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Features />
      <div className="h-6 bg-white lg:h-[22px]" aria-hidden="true" />
    </>
  );
}
